import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_todo_api_url } from '../Utils/Config';
import { UserProvider } from '../Context/UserContext';

function CreateTodoModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // states
  const [task, setTask] = useState("")
  const { user } = useContext(UserProvider)

  const create_todo = async (event) => {

        event.preventDefault()

        const request = await fetch(`${event.target.action}/ekle`, {

            method: event.target.method,
            headers: {

                "Content-type": "application/json"
            },

            body: JSON.stringify({
                
                userId: user._id,
                task_data: task
            })

        })

        const response = await request.json()
        
        if (request.status === 201) {

            // todo başarılı bir şekilde oluştu
            window.location.reload()
        } else {

            alert(response.data)
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