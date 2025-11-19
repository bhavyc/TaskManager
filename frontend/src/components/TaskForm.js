import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const TaskForm = ({ onSubmit, initialTask = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || "");
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onSubmit({ ...initialTask, title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-4 shadow-sm rounded bg-light">
      <Row className="g-2">
        <Col md={5}>
          <Form.Control
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Col>
        <Col md={5}>
          <Form.Control
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button type="submit" className="w-100" variant="success">
            <FaPlus /> {initialTask ? "Update" : "Add"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
