import React, { useEffect, useState } from 'react'
import TaskCard from '../Components/TaskCard'
import { GetSingleTodo } from '../Service/ServiceHandler'
import { Link, useParams } from 'react-router-dom'

export default function EditTaskPage() {

const [task, setTask] = useState([])
const { taskId } = useParams()

const getTask = async () => {

    const request = await GetSingleTodo(taskId)
    console.log(request)
    setTask(request.data)
}

useEffect(() => {


    getTask()

}, [])


return (

        <>


            <div className='mb-3'>
                <Link to="/">Geri Git</Link>
            </div>
        
            <TaskCard task = {task} editMode = {true}></TaskCard>
        
        </>
  )
}
