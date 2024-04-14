import React, { createContext, useState } from 'react'

export const UserProvider = createContext()


export default function UserContext(props) {

    const [user, setUser] = useState(null)

    
    return (
    
        <>
        
            <UserProvider.Provider value={{user, setUser}}>
                
                {props.children}
                
            </UserProvider.Provider>    
        </>
  )
}
