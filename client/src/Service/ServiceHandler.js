import { base_todo_api_url, base_user_api_url } from "../Utils/Config";

const static_header = {

    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-type": "application/json"
}


const validateToken = async () => {

    const request = await fetch(`${base_user_api_url}/verify/token`, {

        headers: static_header
    })
    
    const response = await request.json()

    response.status = request.status

    return response
}

const LoginService = async (payload = {}) => {

    const request = await fetch(`${base_user_api_url}/giris-yap`, {

        method: "post",
        headers: static_header,

        body: JSON.stringify({

            username: payload.username,
            password: payload.password
        })
    })

    const response = await request.json()
    response.status = request.status

    return response
}





const RegisterService = async (payload = {}) => {

    const request = await fetch(`${base_user_api_url}/hesap-olustur`, {

        method: "post",
        headers: static_header,

        body: JSON.stringify({

            username: payload.username,
            email: payload.email,
            password: payload.password
        })

    })

    const response = await request.json()
    response.status = request.status

    return response

}


// TODO API
const GetAllTodos = async () => {

    const request = await fetch(`${base_todo_api_url}`)
    const response = await request.json()

    response.status = request.status

    return response

}

// Spesifik Olarak Al
const GetSingleTodo = async (taskId="") => {

    const request = await fetch(`${base_todo_api_url}/${taskId}`)
    const response = await request.json()

    response.status = request.status

    return response
}

const AddTodoService = async (payload = {}) => {

    const request = await fetch(`${base_todo_api_url}/ekle`, {

        method: "post",
        headers: static_header,

        body: JSON.stringify({
            
            task_data: payload.task
        })

    })

    const response = await request.json()
    response.status = request.status

    return response
}



const UpdateTodoService = async (payload = {}) => {

    const request = await fetch(`${base_todo_api_url}/${payload.taskId}/guncelle`, {

        method: "post",
        headers: static_header,

        body: JSON.stringify({
            
            task_data: payload.task
        })

    })

    const response = await request.json()
    response.status = request.status

    return response
}


const CompletedTodoService = async (payload = {}) => {

    if (!payload.taskId) {

        return console.error("Bir task id belirtmek zorundasınız.")
    }

    const request = await fetch(`${base_todo_api_url}/${payload.taskId}/complete`, {

        method: "post",
        headers: static_header,

        body: JSON.stringify({})

    })

    const response = await request.json()
    response.status = request.status

    return response
}

const DeleteTodoService = async (taskId="") => {

    const request = await fetch(`${base_todo_api_url}/${taskId}/sil`, {

        headers: static_header
    })
    const response = await request.json()

    response.status = request.status

    return response
}



// END OF TODO API 

export {

    validateToken,
    LoginService,
    RegisterService,
    AddTodoService,
    GetAllTodos,
    GetSingleTodo,
    UpdateTodoService,
    DeleteTodoService,
    CompletedTodoService
}