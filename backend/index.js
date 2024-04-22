import express from "express";
import connect_to_db from "./db/Connect.js";
// veritabanını çağır
connect_to_db()

import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'

import { fileURLToPath } from 'url';
import path from 'path';


import 'dotenv/config'
// cors yapısı
import cors from 'cors'

const server = express()
const port = process.env['APP_PORT']



// swagger -> API dökümantasyonlu yazma
// admin.js -> admin paneli oluşturma
// multer -> resim, video vs işleme

// middleware 
// bu middleware API ile JSON verileri body'e atar.
server.use(express.json())
// bu middleware cors politikası kaldırır
server.use(cors())
server.use(express.static("Dashboard"))
// API
import UserAPI from "./API/UserAPI.js"
import TodoAPI from "./API/Todo.js"
// db models
import userModel from "./db/Models/UserModel.js";
import todo_model from "./db/Models/TodoModel.js";

// Admin Dashboard
AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  })



const adminOptions = {
    // We pass Category to `resources`


    branding: {
        companyName: "Node Admin",
        logo: false
    },

    resources: [
    {
        resource: userModel,
        options: {

            properties: {
                password: { isVisible: false}
            }
        }
    }, 
    todo_model],
  }

const admin = new AdminJS(adminOptions)
const adminRouter = AdminJSExpress.buildRouter(admin)


// static API ENDPOINT
const endpoint = "/api/v1"

// main page
server.get('/', function(request, response) {

    response.send("Merhaba dünya..")

})


// API ENDPOINTS
server.use(`${endpoint}/users`, UserAPI)  // /api/v1/users/
server.use(`${endpoint}/todos`, TodoAPI)  // api/v1/todos/düzenle 
// admin dashboard
server.use(admin.options.rootPath, adminRouter)

// portu dinle
server.listen(port, () => {

    console.log(`Node.js http://localhost:${port}/ da çalışıyor.`)
    console.log(`Admin dashboard http://localhost:${port}${admin.options.rootPath}`)
})

