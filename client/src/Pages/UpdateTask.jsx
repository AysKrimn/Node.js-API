import React, { useEffect, useState } from 'react'
import TaskCard from '../Components/TaskCard'
import { GetSingleTodo } from '../Service/ServiceHandler'
import { Link, useParams } from 'react-router-dom'

export default function UpdateTask() {
  
    const { taskId } = useParams()
    const [task, setTask] = useState([])
    const [loader, setLoader] = useState(true)


    useEffect(() => {

    const make_api_request = async () => {

        const request = await GetSingleTodo(taskId)
        console.log("[Single Todo API]", request)

        // eğer hata varsa
        if (request.status === 404) {

            setTask(null)
        } else if (request.status === 200) {

            setTask(request.data)
        }


        setLoader(false)
    }


    make_api_request()

    }, [])


    if (loader) {

        return <p>Lütfen bekleyin..</p>
    }

    return (
    
        <>
        
           
                <Link to="/">Geri Git</Link>

                <div className='mt-2'>

                {

                    task === null ?  
                    <p>Üzgünüz böyle bir todo bulunamadı.</p>

                    :

                    <TaskCard task={task} editMode = {true}></TaskCard>
                }
            
                </div>
        
        </>
  )
}
