import { useState, useEffect } from "react";
import API from "../api";
import { Container, InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = query
        ? await API.get(`/tasks/search?query=${query}`)
        : await API.get("/tasks");
      setTasks(res.data.tasks || res.data);
    } catch (err) {
      console.error("Fetch tasks failed", err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleAddOrUpdate = async (task) => {
    try {
      if (task._id) {
        await API.put(`/tasks/${task._id}`, task);
      } else {
        await API.post("/tasks", task);
      }
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Task add/update failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center" style={{ color: "#4f46e5" }}>Task Dashboard</h2>

      <TaskForm onSubmit={handleAddOrUpdate} initialTask={editingTask} />

      <InputGroup className="mb-4">
        <InputGroup.Text><FaSearch /></InputGroup.Text>
        <Form.Control
          placeholder="Search Tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={fetchTasks}
        />
      </InputGroup>

      <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
    </Container>
  );
};

export default Dashboard;
