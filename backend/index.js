import express from "express";
import connect_to_db from "./db/Connect.js";
import 'dotenv/config'
import cors from 'cors'

const server = express()

// veritabanını çağır
connect_to_db()

const port = process.env['APP_PORT']


// Admin Dashboard
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'

// admin panaeli icin veritabanı adaptorunu ayarla
AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})

// Mongo.db instances
import userModel from "./db/Models/UserModel.js";
import todo_model from "./db/Models/TodoModel.js";

const adminOptions = {
    // We pass Category to `resources`
    branding: {
        companyName: 'Node.js Admin',
        logo: false
    },

    resources: [
        
    {

        resource: userModel,
        options: {

            listProperties: ["name", "email"],

            properties: {

                password:  { isVisible: false },
                createdAt: { type: "richtext"}

               
            }
        }
    }, 
    
    todo_model

    ],
}

const admin = new AdminJS(adminOptions)
// sayfa URL
const adminRouter = AdminJSExpress.buildRouter(admin)



// swagger -> API dökümantasyonlu yazma
// admin.js -> admin paneli oluşturma
// multer -> resim, video vs işleme

// middleware 
// bu middleware API ile JSON verileri body'e atar.
server.use(express.json())
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
server.use(admin.options.rootPath, adminRouter)
// portu dinle
server.listen(port, () => {

    console.log(`Node.js http://localhost:${port}/ da çalışıyor.`)
    console.log(`Admin Dashboard: http://localhost:${port}${admin.options.rootPath} da çalışıyor.`)
})

