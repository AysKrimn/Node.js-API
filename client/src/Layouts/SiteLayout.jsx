import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SiteNavBar from '../Components/SiteNavBar'


import { verify_cached_token } from '../Service/ServiceHandler'
import { UserProvider } from '../Context/UserContext'

export default function SiteLayout() {

  const [Done, setDone] = useState(false)
  const { setUser } = useContext(UserProvider)

  useEffect(() => {

        const loadCriteria = async () => {

            const cachedToken = localStorage.getItem('token')

            if (!cachedToken) {
              setDone(true)
              return
            }


            const user = await verify_cached_token(cachedToken)
            console.log("[VERIFY API]:", user)
            // state güncelle
            setUser(user.data)
            // işlemi bitir.
            setDone(true)
        }
  

  
       loadCriteria()
  }, [])


  return (
    
        <>
                {/* navbar */}
                <SiteNavBar></SiteNavBar>
                <main className='container mt-5'>
                    {/* site içerik */}

                    { Done ? <Outlet></Outlet> : <p>Yükleniyor Lütfen Bekleyin..</p> }
            
                </main>
        
                {/* footer */}
        </>
  )
}
