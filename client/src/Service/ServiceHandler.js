import { base_todo_api_url, base_user_api_url } from "../Utils/Config";

const static_header = {

    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-type": "application/json"
}


const verify_cached_token = async (cachedToken="") => {


    const request = await fetch(`${base_user_api_url}/verify-token`, {
    
        method: "get",
        headers: static_header,
        // body: JSON.stringify({ token: cachedToken})
    })

    const response = await request.json()
    response.status = request.status

    return response

}

const LoginService = async (payload = {}) => {

    const request = await fetch(`${base_user_api_url}/giris-yap`, {

        method: "post",
        headers: static_header,
        body: JSON.stringify(payload)
    })


    const response = await request.json()

    response.status = request.status

    return response

}

// TODO API
const GetAllTaskService = async () => {

    const request = await fetch(`${base_todo_api_url}`)
    const response = await request.json()
    response.status = request.status

    return response
}

const AddTaskService = async (payload = {}) => {

    const request = await fetch(`${base_todo_api_url}/ekle`, {

        method: "post",
        headers: static_header,
        body: JSON.stringify(payload)
    })

    const response = await request.json()

    response.status = request.status

    return response
}

export { 
   
    LoginService, 
    verify_cached_token, 
    GetAllTaskService,
    AddTaskService 

}