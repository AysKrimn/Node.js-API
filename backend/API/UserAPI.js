import express from 'express'

const app = express.Router()

// db
import userModel from '../db/Models/UserModel.js'

// utils
import bcrypt from "bcrypt";

// json web token
import jwt from 'jsonwebtoken'

// user onaylama (KÖTÜ YÖNTEM)
app.get("/verify/token", async function(request, response) {

        console.log("VERIFY API HEADER:", request.headers)
        response.json({ data: "isteğini aldım."})

})

// spesifik user bulma endpointi
app.get("/:userName", async function(request, response) {

    const user = await userModel.findOne({ name: request.params.userName})

    if (user === null) {

        return response.status(404).json({ data: "Böyle bir kullanıcı bulunamadı"})
    }


    response.status(200).json({ data: user})
})

// bu endpoint giriş yapmayı sağlar.
app.post("/giris-yap", async function(request, response) {

        const { username, password } = request.body

        if (!username || !password) {

            return response.status(400).json({ data: "Lütfen tüm alanları doldurunuz"})
        }

        const user = await userModel.findOne({ name: username})

        if (user === null) {

            return response.status(400).json({ data: "Böyle bir hesap bulunamadı"})
        }

        const correctPassword = await bcrypt.compare(password, user.password)
        // eğer şifre yanlışsa
        if (!correctPassword) {

            return response.status(400).json({ data: "Lütfen bilgileriniz kontrol edip tekrar deneyiniz"})
        }

        // kullanıcıya passaport oluştur
        const token = jwt.sign({user}, process.env['JWT_SECRET'])

        response.status(200).json({ data: token })
})
// bu endpoint hesap oluşturru.
app.post("/hesap-olustur", async function(request, response) {

    const { username, email, password } = request.body

    if (!username || !email || !password) {

        return response.status(400).json({ data: "Lütfen tüm alanları doldurunuz"})
    }
    // bu emaile sahip başka bir user var mı?
    const alreadyRegistered = await userModel.findOne({ email: email})

    if (alreadyRegistered)  {

        return response.status(400).json({ data: "Bu email zaten kayıtlı"})
    }

    // şifreyi hashle
    const hashPassword = await bcrypt.hash(password, 10)

    const new_user = await userModel.create({

        name: username,
        email: email,
        password: hashPassword
    })

    response.status(201).json({ data: new_user})
})

// BURADAN İTİBAREN KULLANICI KİMLİK DOĞRULAMA YAP
// hesap silme endpoint
app.post("/hesap-sil", async function(request, response) {

    const { targetUserId } = request.body

    if (!targetUserId) {

        return response.status(400).json({ data: "Lütfen gerekli alanları doldurunuz"})
    }

    try {
        let message = null
        const user = await userModel.findOne({ _id: targetUserId})

        // son kez bilgileri gönder
        message = `${user.name} (#${user.id}) hesap başarılı bir şekilde silindi`
        // hesabı sil
        await user.deleteOne()

        response.status(200).json({ data: message})

    } catch (error) {
        
        console.log("[HESAP SİLME APIDA BİR SIKINTI MEYDANA GELDI]:", error)

        response.status(400).json({ data: "Böyle bir kullanıcı bulunamadı"})
    }
   

})

// rütbe ekleme
app.post("/role/ekle", async function(request, response) {

    const { promotedUserId, roleName } = request.body

    if (!promotedUserId || !roleName) {

        return response.status(400).json({ data: "Lütfen gerekli alanları doldurunuz"})
    }

    if (!["Admin"].includes(roleName)) {

        return response.status(400).json({ data: "Geçersiz rol"})
    }

    // kullancııyı bul
    try {

        const target_user = await userModel.findOne({  _id: promotedUserId})

        // verilmek istenen rol zaten varsa
        if (target_user.roles.includes(roleName)) {

            return response.status(400).json({ data: "Kullanıcı bu role zaten sahip"})
        }

        target_user.roles.push(roleName)
        // kaydet
        target_user.save()

        response.status(201).json({ data: target_user})

    } catch (error) {
        
        console.log("[USER PROMOTE API da bir sıkıntı meydana geldi]:", error)

        response.status(400).json({ data: "Böyle bir kullanıcı bulunamadı"})
    }
   



})



// rütbe kaldırma
app.post("/role/kaldir", async function(request, response) {

    const { promotedUserId, roleName } = request.body

    if (!promotedUserId || !roleName) {

        return response.status(400).json({ data: "Lütfen gerekli alanları doldurunuz"})
    }

    if (!["Admin"].includes(roleName)) {

        return response.status(400).json({ data: "Geçersiz rol"})
    }

    // kullancııyı bul
    try {

        const target_user = await userModel.findOne({  _id: promotedUserId})

        // verilmek istenen rol zaten varsa
        if (!target_user.roles.includes(roleName)) {

            return response.status(400).json({ data: "Kullanıcı bu role zaten sahip değil"})
        }

        target_user.roles = target_user.roles.filter(role => role != "Admin")
        // kaydet
        target_user.save()

        response.status(201).json({ data: target_user})

    } catch (error) {
        
        console.log("[USER DEMOTE API da bir sıkıntı meydana geldi]:", error)

        response.status(400).json({ data: "Böyle bir kullanıcı bulunamadı"})
    }
   



})


export default app