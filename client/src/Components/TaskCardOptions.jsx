import Dropdown from 'react-bootstrap/Dropdown';
import { DeleteTodoService } from '../Service/ServiceHandler';
import { useContext } from 'react';
import { TaskProvider } from '../Context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { UserProvider } from '../Context/UserContext';

export default function TaskCardOptions(props) {
  
  const { taskId, taskAuthorId, editMode } = props
  const { tasks, setTasks } = useContext(TaskProvider)
  const { user } = useContext(UserProvider)

  const yonlendir = useNavigate()
  // bu fonksiyon todo gunceller
  const updateHanlder = async () => {


      yonlendir(`/task/${taskId}/edit`)

  }
  // bu fonksiyon todo siler
  const deleteHandler = async () => {

    const onayla = window.confirm("Bu taskı silmek istediğinize emin misiniz?")

    if (onayla) {

            const request = await DeleteTodoService(taskId)
            console.log("[TASK DELETE API]:", request)

            if (request.status === 200) {

                // state güncelle
                const getCurrentState = tasks.filter(task => task._id !== taskId)
                setTasks(getCurrentState)
            }


            if (editMode) {

                yonlendir("/")
            }
    }

  }



  const updateLayout = () => {

      if (user?._id === taskAuthorId) {

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
                    <Dropdown.Item className='text-success' as="button">Tamamlandı Olarak İşaretle</Dropdown.Item>

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

