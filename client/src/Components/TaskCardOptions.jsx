import Dropdown from 'react-bootstrap/Dropdown';
import { CompleteTaskService, DeleteTodoService } from '../Service/ServiceHandler';
import { useContext } from 'react';
import { TaskProvider } from '../Context/TaskContext';
import { useNavigate } from 'react-router-dom';



export default function TaskCardOptions(props) {
  
  const { taskId, editMode } = props
  const { tasks, setTasks } = useContext(TaskProvider)
  const yonlendir = useNavigate()


  const setCompleted = async () => {

      const request = await CompleteTaskService(taskId)
      const instances = tasks.filter(task => task)
      const previousInstance = instances.find(task => task._id === taskId)
      previousInstance.completed = request.newOne.completed
      
      setTasks(instances)
  }

  const updateHandler = async () => {

      yonlendir(`task/${taskId}`)    

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

                if (editMode) {

                    yonlendir("/")
                }
            }
    }

  }


  return (
    <>
      <Dropdown data-bs-theme="dark" className='ms-auto'>
        <Dropdown.Toggle id="dropdown-button-dark-example1">

        </Dropdown.Toggle>

        <Dropdown.Menu>

          { editMode === undefined ?

          <Dropdown.Item className='text-warning' as="button" onClick={updateHandler}>
            Güncelle
          </Dropdown.Item>

          : null}

          <Dropdown.Item className='text-danger' as="button" onClick={deleteHandler}>Sil</Dropdown.Item>
          <Dropdown.Item className='text-success' as="button" onClick={setCompleted}>Tamamlandı Olarak İşaretle</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </>
  )

}

