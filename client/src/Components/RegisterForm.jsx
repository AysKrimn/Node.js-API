import React, { useState } from 'react'

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'


// BASE URI
import { base_user_api_url } from '../Utils/Config';


export default function RegisterForm() {

  // states
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [formErrors, setFormErrors] = useState([])

  // fonksiyon
  const create_account = async (event) => {

        event.preventDefault()

        if (!username) {

            setFormErrors([...formErrors, "Kullanıcı Adı Boş Bırakılamaz."])
        }


        if (!email) {

            setFormErrors([...formErrors, "E-mail Boş Bırakılamaz."])
        }

        if (!password) {

            setFormErrors([...formErrors, "Parola Boş Bırakılamaz."])
        }


        if (!passwordCheck) {

            setFormErrors([...formErrors, "Parola Tekrar Boş Bırakılamaz."])
        }

        if (formErrors.length) {

            return
        }


        // api isteği yap
        const request = await fetch(`${event.target.action}/hesap-olustur`, {

                method: event.target.method,
                headers: {

                    "Content-type": "application/json"
                },

                body: JSON.stringify({

                    username: username,
                    email: email,
                    password: password
                })
        })

        const response = await request.json()

        console.log("SUNUCUDAN GELEN YANIT:", response, "SUNUCUDAN GELEN STATUS KOD:", request.status)
  
        if (request.status >= 400 && request.status <= 499) {

            setFormErrors([...formErrors, response.data])
            return
        } else if (request.status >= 200 && request.status <= 299) {

            // useri login sayfasına yönlendir
            window.location.href = "/login"
        }
  
    }

  return (
    <>

        <form action={base_user_api_url} method='post' onSubmit={create_account}>

            <ul>
                {formErrors.map((hata, index) => {

                    return <li className='text-danger' key={index}>{hata}</li>
                })}
            </ul>

            <FloatingLabel
                controlId="floatingInput"
                label="Kullanıcı Adı"
                className="mb-3"
            >
            <Form.Control type="text" placeholder="admin"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
            </FloatingLabel>



            <FloatingLabel
            controlId="floatingEmailInput"
            label="Email address"
            className="mb-3"
            >
            <Form.Control type="text" placeholder="name@example.com" 
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Parola" className='mb-3'>
            <Form.Control type="password" placeholder="Parola" 
                    
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
            
            />
            </FloatingLabel>
            

            <FloatingLabel controlId="floatingCheckPassword" label="Parola Tekrar">
            <Form.Control type="password" placeholder="Parola Tekrar"  
            
                value = {passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
            />
            </FloatingLabel>


            <div className='mt-3'>
                    <p className='text-muted'>Hesabın varsa buradan <Link to="/login">Giriş Yap</Link></p>
            </div>
            <div className='mt-3'>
                    <button type='submit' className='btn btn-success'>Kayıt Oluştur</button>
            </div>
      
        </form>
  </>
  )
}
