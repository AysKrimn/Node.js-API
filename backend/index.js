import express from "express";
import connect_to_db from "./db/Connect.js";
import 'dotenv/config'
import cors from 'cors'



const server = express()
// veritabanını çağır
connect_to_db()

const port = process.env['APP_PORT']

// swagger -> API dökümantasyonlu yazma
// admin.js -> admin paneli oluşturma
// multer -> resim, video vs işleme

// middleware 
// bu middleware API ile JSON verileri body'e atar.
server.use(express.json())
// CORS YAPISINI AYARLA
// bu middleware cors politikası kaldırır
server.use(cors())

// API
import UserAPI from "./API/UserAPI.js"
import TodoAPI from "./API/Todo.js"



server.get('/', function(request, response) {

    response.send("Merhaba dünya..")

})

// static API ENDPOINT
const endpoint = "/api/v1"

// API ENDPOINTS
server.use(`${endpoint}/users`, UserAPI)  // /api/v1/users/
server.use(`${endpoint}/todos`, TodoAPI)  // api/v1/todos/düzenle 

// portu dinle
server.listen(port, () => {

    console.log(`Node.js http://localhost:${port}/ da çalışıyor.`)
})

