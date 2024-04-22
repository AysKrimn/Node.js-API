import Dropdown from 'react-bootstrap/Dropdown';
import { CompletedTodoService, DeleteTodoService } from '../Service/ServiceHandler';
import { useContext, useState } from 'react';
import { TaskProvider } from '../Context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { UserProvider } from '../Context/UserContext';

export default function TaskCardOptions(props) {
  
  const { task, editMode } = props
  const { tasks, setTasks } = useContext(TaskProvider)
  const { user } = useContext(UserProvider)


  const yonlendir = useNavigate()
  // bu fonksiyon completed olayını ayarlar
  const completeHandler = async () => {

        const request = await CompletedTodoService({ taskId: task._id })
        console.log("[TASK COMPLETE API]:", request)
        
        if (request.status === 200) {

            const taskInstances = tasks.filter(i_task => i_task)
            const targetTask = taskInstances.find(i_task => i_task._id === task._id)
            targetTask.completed = request.data.completed
            // state güncelle
            setTasks(taskInstances)

        }

  }

  // bu fonksiyon todo gunceller
  const updateHanlder = async () => {


      yonlendir(`/task/${task._id}/edit`)

  }
  // bu fonksiyon todo siler
  const deleteHandler = async () => {

    const onayla = window.confirm("Bu taskı silmek istediğinize emin misiniz?")

    if (onayla) {

            const request = await DeleteTodoService(task._id)
            console.log("[TASK DELETE API]:", request)

            if (request.status === 200) {

                // state güncelle
                const getCurrentState = tasks.filter(i_task => i_task._id !== task._id)
                setTasks(getCurrentState)
            }


            if (editMode) {

                yonlendir("/")
            }
    }

  }



  const buttonOptions = {

    text: "Tamamlandı Olarak İşaretle",
    style: "text-success"

  }

  if (task.completed === true) {

    buttonOptions.text = "Tamamlanmadı Olarak İşaretle"
    buttonOptions.style = "text-info"
  }

  const updateLayout = () => {

      if (user?._id === task.user._id) {

          return (

              <>
              
              <Dropdown data-bs-theme="dark" className='ms-auto'>
              <Dropdown.Toggle id="dropdown-button-dark-example1">

              </Dropdown.Toggle>

              <Dropdown.Menu>
                    {
                        editMode === true ? null : <Dropdown.Item onClick={updateHanlder} className='text-warning' as="button"> Güncelle </Dropdown.Item>
                    }
                    
                    <Dropdown.Item className='text-danger' as="button" onClick={deleteHandler}>Sil</Dropdown.Item>
                    <Dropdown.Item className={buttonOptions.style} as="button" onClick={completeHandler} >

                        {buttonOptions.text}

                    </Dropdown.Item>

              </Dropdown.Menu>
              </Dropdown>
             
              
              
              </>
          )
      }

  }

  return (
    <>

        {updateLayout()}
    </>
  )

}

