import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TaskCardOptions from './TaskCardOptions';

function TaskCard(props) {
  
  const { task } = props

  return (

    <Card className='mb-4'>
   
      <Card.Body>

        <div className="d-flex align-items-center">

        <Card.Title>Test User <small className='text-muted taskId'>(#{task._id})</small> </Card.Title>
        <TaskCardOptions taskId = {task._id}></TaskCardOptions>

        </div>

        <Card.Text>
            {task.task}
        </Card.Text>

        <Card.Text className='mt-3'>

        <small className='text-muted task-date'>{task.createdAt}</small>
        </Card.Text>

      </Card.Body>
    </Card>
  );
}

export default TaskCard;