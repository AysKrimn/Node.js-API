import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function TaskCard(props) {

  const { task } = props


  return (

    <Card className='mb-3'>

      <Card.Body>
        <Card.Title>Test User <small style={{fontSize: "small"}} className='text-muted'>#{task._id}</small></Card.Title>
        <Card.Text>
                {task.task}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;