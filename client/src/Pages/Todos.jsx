import React from 'react'
import CreateTodoModal from '../Components/CreateTodoModal'



export default function Todos() {
  return (
    
        <>
            <div className="d-flex align-items-center">

                <h2>Todo Oluştur</h2>
                <CreateTodoModal></CreateTodoModal>

            </div>
            <hr />
        </>
  )
}
