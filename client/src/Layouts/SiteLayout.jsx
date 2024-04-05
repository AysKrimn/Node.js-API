import React from 'react'
import { Outlet } from 'react-router-dom'

export default function SiteLayout() {
  return (
    
        <>
                {/* navbar */}

                <main className='container mt-5'>
                    {/* site içerik */}
                    <Outlet></Outlet>
                </main>
        
                {/* footer */}
        </>
  )
}
