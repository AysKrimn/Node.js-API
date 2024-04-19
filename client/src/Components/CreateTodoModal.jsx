import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_todo_api_url } from '../Utils/Config';
import { UserProvider } from '../Context/UserContext';
import { AddTodoService } from '../Service/ServiceHandler';
import { TaskProvider } from '../Context/TaskContext';

function CreateTodoModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // states
  const [task, setTask] = useState("")
  const { user } = useContext(UserProvider)
  const { tasks, setTasks} = useContext(TaskProvider)

  const create_todo = async (event) => {

        event.preventDefault()

        const request = await AddTodoService({ task })
        
        if (request.status === 201) {

            // todo başarılı bir şekilde oluştu
            setTasks([...tasks, request.data])
        } else {

            alert(request.data)
        }
  }

  return (
    <>
      <Button className='ms-auto' variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Todo Oluştur</Modal.Title>
        </Modal.Header>
        <form action={base_todo_api_url} method='post' onSubmit={create_todo}>
        
        <Modal.Body>

            <input placeholder='Task' type="text" className='form-control' 
              onChange={(event) => setTask(event.target.value)}
              value={task}
            />

        </Modal.Body>
        
        <Modal.Footer>
          <Button type='submit' variant="primary" onClick={handleClose}>
            Oluştur
          </Button>
        </Modal.Footer>

        </form>

      </Modal>
    </>
  );
}

export default CreateTodoModal;