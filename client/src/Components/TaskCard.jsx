import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TaskCardOptions from './TaskCardOptions';

function TaskCard(props) {
  
  const { task, editMode } = props
  
  let cardClass = "mb-4"
  let cardCompleted = ""

  if (task.completed === true) {

    cardCompleted = "completed"
  }

  if (editMode) {
      cardClass = "mb-2"
  }

  return (

    <>
    <Card className={`${cardClass} ${cardCompleted}`}>
   
      <Card.Body>

        <div className="d-flex align-items-center">

        <Card.Title>Test User <small className='text-muted taskId'>(#{task._id})</small> </Card.Title>
        <TaskCardOptions taskId = {task._id} editMode={editMode}></TaskCardOptions>

        </div>

        <Card.Text>
            {task.task}
        </Card.Text>

        <Card.Text className='mt-3'>

        <small className='text-muted task-date'>{task.createdAt}</small>
        </Card.Text>

      </Card.Body>
    </Card>

    { editMode ?    

      <div className='text-end'>
          <button className='btn btn-primary'>Güncelle</button>
      </div>

    : null
    }
    </>
    
  );
}

export default TaskCard;