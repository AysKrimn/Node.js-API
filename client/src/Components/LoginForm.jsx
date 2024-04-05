import React, { useState } from 'react'

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { base_user_api_url } from '../Utils/Config';


export default function LoginForm() {
  
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const login_user = async (event) => {

        event.preventDefault()

        if (!username || !password) {

            setError("Lütfen gerekli inputları doldurunuz.")
            return
        }

        const request = await fetch(`${event.target.action}/giris-yap`, {

            method: event.target.method,
            headers: {

                "Content-type": "application/json"
            },

            body: JSON.stringify({

                username: username,
                password: password
            })
        })

        const response = await request.json()

        console.log("[LOGIN API] YANIT:", response)

        if (request.status >= 400 && request.status <= 499) {

            setError(response.data)
            return
        } else if (request.status >= 200 && request.status <= 299) {

            // login olmuştur
            window.location.href = "/"
        }
    }

return (
    <>

        <form action={base_user_api_url} method='post' onSubmit={login_user}>

            <p className='text-danger'>{error}</p>

            <FloatingLabel
            controlId="floatingInput"
            label="Email address veya Kullanıcı Adı"
            className="mb-3"
            >
            <Form.Control type="text" placeholder="name@example.com" 

                value = {username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Parola">
            <Form.Control type="password" placeholder="Parola" 
            
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
            />
            </FloatingLabel>
            
            <div className='mt-3'>
                    <p className='text-muted'>Hesabın yoksa buradan <Link to="/register">Kayıt Ol</Link> </p>
            </div>
            <div className='mt-3'>
                    <button type='submit' className='btn btn-success'>Oturum Aç</button>
            </div>
      
        </form>
  </>
  )
}
