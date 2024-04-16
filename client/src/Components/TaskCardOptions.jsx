import Dropdown from 'react-bootstrap/Dropdown';
import { DeleteTodoService } from '../Service/ServiceHandler';
import { useContext } from 'react';
import { TaskProvider } from '../Context/TaskContext';



export default function TaskCardOptions(props) {
  
  const { taskId } = props
  const { tasks, setTasks } = useContext(TaskProvider)

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
    }

  }


  return (
    <>
      <Dropdown data-bs-theme="dark" className='ms-auto'>
        <Dropdown.Toggle id="dropdown-button-dark-example1">

        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item className='text-warning' as="button">
            Güncelle
          </Dropdown.Item>
          <Dropdown.Item className='text-danger' as="button" onClick={deleteHandler}>Sil</Dropdown.Item>
          <Dropdown.Item className='text-success' as="button">Tamamlandı Olarak İşaretle</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </>
  )

}

