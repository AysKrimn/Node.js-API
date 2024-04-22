import Card from 'react-bootstrap/Card';
import TaskCardOptions from './TaskCardOptions';
import { useState } from 'react';
import { UpdateTodoService } from '../Service/ServiceHandler';
import { useNavigate } from 'react-router-dom';

function TaskCard(props) {
  
  const [disabledBtn, setDisabledBtn] = useState(false)
  const [input, setInput] = useState("")
  const yonlendir = useNavigate()
  
  const changeInputState = (e) => {

      setInput(e.target.value)

    //   console.log("LENGHT:", input.length)
    //   if (input.length >= 1) {

    //       setDisabledBtn(false)
    //       return
    //   }

    //   if (input.length <= 0) {

    //       setDisabledBtn(true)
    //   }
    }


  const { task, editMode } = props
  
  // task, taskId
  const updateTask = async () => {

    const request = await UpdateTodoService({ task: input, taskId: task._id })
    console.log("[TASK UPDATE API]", request)

    // usenavigate
    if (request.status === 201) {

      yonlendir("/")
    }
  }




  const updateLayout = () => {

    let defaultClass = ""

    if (task.completed === true) {

        defaultClass = "mb-3 completed"
    
    } else {

      defaultClass = "mb-3"
    }

    return (

        <>
        
        <Card className={defaultClass}>
   
        <Card.Body>

          <div className="d-flex align-items-center">

                <Card.Title>{task.user.name} <small className='text-muted taskId'>(#{task.user._id})</small> </Card.Title>
                <TaskCardOptions 

                    task = {task} 
                    editMode = {editMode}>

                </TaskCardOptions>

          </div>

 
          { 
          
          editMode === true 
          
          ?  <div className='mt-4'>

                <input className='form-control' type="text" placeholder={task.task} 
                   value={input} onChange={e => changeInputState(e)}
                 />
              </div>
          
          :  <Card.Text> {task.task} </Card.Text>
        
          }


          <div className="d-flex align-items-center mt-3">

              <Card.Text className='mt-3'>
                  <small className='text-muted task-date'>{task.createdAt}</small>
              </Card.Text>

              {

                editMode === true ?
            

              <div className='ms-auto'>
                  <button onClick={updateTask} disabled={disabledBtn} className='btn btn-success'>Güncelle</button>
              </div>

              : null

              }
          </div>


          </Card.Body>
      </Card>
        
        </>
    )

  }



  return (

    <>
   
        {updateLayout()}
    </>
  );
}

export default TaskCard;