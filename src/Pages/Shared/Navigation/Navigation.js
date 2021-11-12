import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import logo from "../../../images/android-chrome-192x192.png";
import "./Navigation.css";
const Navigation = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img className="w-25" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="fw-bold" as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link className="fw-bold" as={Link} to="/explore">
              Explore
            </Nav.Link>
          </Nav>
          <Nav>
            {!user.email ? (
              <Nav.Link className="fw-bold" as={Link} to="/login">
                Login
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={handleLogout}
                className="fw-bold"
                as={Link}
                to="/"
              >
                Logout
              </Nav.Link>
            )}
            {user.email && (
              <Nav.Link className="fw-bold" as={Link} eventKey={2} to="/">
                {user?.photoURL} {user?.displayName}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
