import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SiteNavBar from '../Components/SiteNavBar'
import { base_user_api_url } from '../Utils/Config'
import { UserProvider } from '../Context/UserContext'

export default function SiteLayout() {

  const [loadPage, setLoadPage] = useState(false)
  const { setUser } = useContext(UserProvider)

  useEffect(() => {

      const get_user_detail = async (userId) => {

          const request = await fetch(`${base_user_api_url}/verify/${userId}`)
          const response = await request.json()

          console.log("VERİFY API:", response)
          if (request.status === 200) {

              setUser(response.data)
          }

          // sayfanın kilidini aç
          setLoadPage(true)
      }


      const userId = localStorage.getItem("public_id")

      if (userId) {

          get_user_detail(userId)
      
      } else {

        setLoadPage(true)
      }

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
