import { Navbar as BSNavbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <BSNavbar
      expand="lg"
      style={{
        background: "linear-gradient(90deg, #4f46e5, #9333ea, #ec4899)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
      variant="dark"
      className="py-3 animate__animated animate__fadeInDown"
    >
      <Container>
        <BSNavbar.Brand
          onClick={() => navigate("/")}
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <FaTasks className="animate__animated animate__bounce animate__infinite" />
          Task Manager
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-3">
            {token ? (
              <Button
                onClick={handleLogout}
                variant="light"
                style={{
                  fontWeight: "bold",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  onClick={() => navigate("/login")}
                  style={{ fontWeight: "bold", transition: "transform 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  Login
                </Button>
                <Button
                  variant="light"
                  onClick={() => navigate("/register")}
                  style={{ fontWeight: "bold", transition: "transform 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  Register
                </Button>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
