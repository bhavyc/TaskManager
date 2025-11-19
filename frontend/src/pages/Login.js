import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
// import "animate.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg rounded animate__animated animate__fadeInDown" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4" style={{ color: "#4f46e5" }}>
          <FaSignInAlt /> Login
        </h2>

        {error && <Alert variant="danger" className="animate__animated animate__shakeX">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-pill"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-pill"
            />
          </Form.Group>
          <Button type="submit" className="w-100 mb-2" variant="primary">
            Login
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/register" style={{ color: "#4f46e5" }}>Register</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
