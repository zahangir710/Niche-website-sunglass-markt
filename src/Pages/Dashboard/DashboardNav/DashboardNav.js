import React from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const DashboardNav = () => {
  const { logout, admin } = useAuth();
  const handlelogout = () => {
    logout();
  };
  return (
    <Navbar bg="warning" expand={false}>
      <Container fluid>
        <Navbar.Brand className="fs-1" as={Link} to="">
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fs-1" id="offcanvasNavbarLabel">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link className="fs-3 text-dark" as={Link} to="/home">
                Home
              </Nav.Link>
              {admin ? (
                <Nav.Link
                  className="fs-3 text-dark"
                  as={Link}
                  to="/manageorders"
                >
                  Manage Orders
                </Nav.Link>
              ) : (
                <Nav.Link className="fs-3 text-dark" as={Link} to="/myorders">
                  My Orders
                </Nav.Link>
              )}
              {!admin ? (
                <Nav.Link className="fs-3 text-dark" as={Link} to="myreviews">
                  My Reviews
                </Nav.Link>
              ) : (
                <Nav.Link
                  className="fs-3 text-dark"
                  as={Link}
                  to="manageproducts"
                >
                  Manage Products
                </Nav.Link>
              )}
              {!admin ? (
                <Nav.Link className="fs-3 text-dark" as={Link} to="payment">
                  Payment Method
                </Nav.Link>
              ) : (
                <Nav.Link className="fs-3 text-dark" as={Link} to="makeadmin">
                  Make Admin
                </Nav.Link>
              )}
              <Button onClick={handlelogout} className="mt-5" variant="warning">
                Logout
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default DashboardNav;
