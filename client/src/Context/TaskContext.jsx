import React, { createContext, useState } from 'react'

export const TaskProvider = createContext()

export default function TaskContext(props) {

  const [tasks, setTasks] = useState([])

  return (
    
        <>
            <TaskProvider.Provider value={{ tasks, setTasks}}>

                {props.children}

            </TaskProvider.Provider>
        </>
  )
}
