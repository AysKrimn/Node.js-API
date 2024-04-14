import React, { useState } from 'react'

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import { LoginService } from '../Service/ServiceHandler';


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

        const response = await LoginService({ username: username, password: password})

        console.log("[LOGIN API] YANIT:", response)

        if (response.status >= 400 && response.status <= 499) {

            setError(response.data)

        } else if (response.status >= 200 && response.status <= 299) {

            // login olmuştur
            localStorage.setItem("token", response.data)
            window.location.href = "/"
        }
    }

return (
    <>

        <form onSubmit={login_user}>

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
