import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SiteNavBar from '../Components/SiteNavBar'
import { UserProvider } from '../Context/UserContext'
import { validateToken } from '../Service/ServiceHandler'

export default function SiteLayout() {

  const [loadPage, setLoadPage] = useState(false)
  const { setUser } = useContext(UserProvider)

  useEffect(() => {

      const parseToken = async () => {

          if (!localStorage.getItem("token")) {

              setLoadPage(true)
              return
          }

          // tokeni kontrol et ve useri setle
          const request = await validateToken()
          console.log("[VERIFY API]:", request)
          // user statesini güncelle
          if (request.status === 200) {
              
              setUser(request.data.user)
          }

          
          setLoadPage(true)
      }


      parseToken()

  }, [])


  return (
    
        <>
                {/* navbar */}
                <SiteNavBar></SiteNavBar>
                <main className='container mt-5'>
                    {/* site içerik */}

                    { 
                    
                      loadPage === true ? <Outlet></Outlet> : null
                    
                    }
           
                </main>
        
                {/* footer */}
        </>
  )
}
