import React, { useContext, useEffect } from 'react'
import CreateTodoModal from '../Components/CreateTodoModal'
import { TaskProvider } from '../Context/TaskContext'
import { GetAllTodos } from '../Service/ServiceHandler'
import TaskCard from '../Components/TaskCard'

export default function HomePage() {
  
  const { tasks, setTasks } = useContext(TaskProvider)
  

  useEffect(() => {

      const fetch_todos = async () => {

          const request = await GetAllTodos()
          console.log("[TASK API]:", request)

          if (request.status === 200) {

              setTasks(request.data)
          }
      }

      fetch_todos()

  }, [])


  return (
    
    <>
    

    <div className="d-flex align-items-center">

            <h2>Dashboard</h2>
            <CreateTodoModal></CreateTodoModal>

    </div>
    <hr />

      {/* maple */}

      {tasks.map(task => {

          return <TaskCard key={task._id} task = {task}> </TaskCard>

      })}
    
    </>
  )
}
