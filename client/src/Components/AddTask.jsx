import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddTaskService } from '../Service/ServiceHandler';
import { TaskProvider } from '../Context/TaskContext';

function AddTask() {
  const { tasks, setTasks } = useContext(TaskProvider)

  const [show, setShow] = useState(false);
  const [task, setTask] = useState("")
  const [error, setError] = useState("")

  const handleClose = () => {

        setShow(false)
        setTask("")
        setError("")
  };

  const handleShow = () => setShow(true);


  const sendData = async (e) => {

        e.preventDefault()
        const request = await AddTaskService({ task_data: task})

        console.log("ADD TODO API:", request)
        if (request.status === 400) {

            setError(request.data)
            return
        }

    
        setTasks([...tasks , request.data])
        
        handleClose()
  }

  return (
    <>
      <Button className='ms-auto' variant="success" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Ekle</Modal.Title>
        </Modal.Header>

        <form onSubmit={sendData}>

        <Modal.Body>

                <div className='mb-3'>
                        <p className='text-danger'>{error}</p>

                        <input type="text" className='form-control' placeholder='Task Ekle' 
                            onChange={(e) => setTask(e.target.value)} value={task}
                        />
                </div>
        </Modal.Body>

        <Modal.Footer>


          <Button type='submit' variant="primary">
            Ekle
          </Button>


        </Modal.Footer>

        </form>

      </Modal>
    </>
  );
}

export default AddTask;