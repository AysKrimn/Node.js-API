import React, { useContext, useEffect } from 'react'
import AddTask from '../Components/AddTask'
import { GetAllTaskService } from '../Service/ServiceHandler'
import { TaskProvider } from '../Context/TaskContext'
import TaskCard from '../Components/TaskCard'

export default function HomePage() {

  const { tasks, setTasks } = useContext(TaskProvider)

  const fetchTasks = async () => {

        const request = await GetAllTaskService()
        console.log("GET ALL TASK API:", request)

        if (request.status === 200) {
            setTasks(request.data)
        }
  }

  useEffect(() => {

        fetchTasks()

  }, [])

  return (
    
    <>
    

                <div className="d-flex align-items-center">
                  <h1>AnaSayfa</h1>
                  <AddTask></AddTask>
                </div>
                <hr />

                {tasks.map((task) => {


                    return <TaskCard key={task._id} task = {task}></TaskCard>

                })}

    
    </>
  )
}
