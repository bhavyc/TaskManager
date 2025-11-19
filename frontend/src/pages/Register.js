import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { FaUserPlus } from "react-icons/fa";
// import "animate.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{   }}>
      <div className="bg-white p-5 rounded shadow-lg animate__animated animate__fadeInUp" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 text-primary animate__animated animate__zoomIn">
          <FaUserPlus /> Create Account
        </h2>

        {error && <div className="alert alert-danger animate__animated animate__shakeX">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control rounded-pill"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded-pill"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control rounded-pill"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill mb-2">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
