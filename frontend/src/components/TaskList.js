import { Card, Button, Row, Col } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length)
    return <p className="text-center text-muted fst-italic">No tasks available</p>;

  return (
    <Row>
      {tasks.map((task) => (
        <Col key={task._id} md={4} sm={6} xs={12} className="mb-3">
          <Card className="shadow-sm rounded-3" style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Card.Body>
              <Card.Title style={{ color: "#4f46e5" }}>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
              <div className="d-flex gap-2">
                <Button variant="primary" onClick={() => onEdit(task)}> <FaEdit /> Edit </Button>
                <Button variant="danger" onClick={() => onDelete(task._id)}> <FaTrash /> Delete </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TaskList;
