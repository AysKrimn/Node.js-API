import express from 'express'
const app = express.Router()


// TODO MODEL
import todo_model from '../db/Models/TodoModel.js'
import { checkToken } from '../Auth/CheckToken.js'
// Auth MiddleWare

// tüm todoları gönder
app.get('/', async function(request, response) {


    // bütün todoları döndür
    const all_todos = await todo_model.find({})
    
    response.status(200).json({ data: all_todos})

})

// spesifik todo
app.get('/:todoId', async function(request, response) {

    // error handling
    try {

        const todoId = request.params.todoId
        const todo = await todo_model.findOne({ _id: todoId})
    
        response.status(200).json({ data: todo})

    } catch(error) {


        response.status(404).json({ data: "Böyle bir todo bulunamadı."})
    }

    

   
})

// buradan itibaren token kontrolü yap
app.use(checkToken)

// bu endpoint todo siler
app.get("/:todoId/sil", async function(request, response) {

    const todoId = request.params.todoId

    try {

        await todo_model.deleteOne({ _id: todoId})
        response.status(200).json({ data: "Başarılı bir şekilde todo silindi."})

    } catch (error) {

             console.log("[TODO DELETE API da bir SIKINTI MEYDANA GELDI]:", error)

             if (error.name === "CastError") {
                return response.status(404).json({ data: "Böyle bir todo bulunamadı."})
            }

            return response.status(400).json({ data: "Birşeyler ters gitti lütfen 10 dakika sonra tekrar dene."})
    }
})

// bu endpoint todo günceller
app.post("/:todoId/guncelle", async function(request, response) {

        const { completed, task_data} = request.body
        const todoId = request.params.todoId
        try {
                // eğer task_data varsa kullanıcı task içeriğini değiştirmek istiyor.
                const todo = await todo_model.findOne({ _id: todoId })

                if (task_data) {

                    // todo.task = yemek yicem
                    todo.task = task_data
     
                }

                if (completed) {

                    todo.completed = completed
       
                }


                // veritabanına kaydet
                await todo.save()

                response.status(201).json({ data: todo})
        
        
        } catch (error) {
            
            console.log("[TODO GUNCELLEME API DAN BİR SIKINT MEYDANA GELDI]", error.name)
            let errorMessage = ""

            if (error.name === "ValidationError") {

                errorMessage = "Birşeyler ters gitti lütfen 10 dakika sonra tekrar deneyiniz."
            }

            if (error.name === "CastError") {

                errorMessage = "Böyle bir todo bulunamadı."
            }


            response.status(404).json({ data: errorMessage})
        }
 

})

// bu endpoint veri ekler
// post isteği geliyosa body içinde ekstre bilgiler gönderilir
app.post("/ekle", async function(request, response) {

        const { task_data, userId } = request.body

        console.log("GELEN VERİLER :", request.body)

        if (!task_data) {

            return response.status(400).json({ data: "Bir task belirtmek zorundasınız."})
        }

        // todo oluştur
        const new_todo = await todo_model.create({

                task: task_data,
                userId: userId
        })

        console.log("NEW TODO:", new_todo)

        response.status(201).json({ data: new_todo})

})




export default app