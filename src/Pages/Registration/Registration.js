import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Navigation from "../Shared/Navigation/Navigation";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Registration = () => {
  const history = useHistory();
  const { createUser } = useAuth();
  const [registeredUser, setRegisteredUser] = useState("");
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newUser = { ...registeredUser };
    newUser[field] = value;
    setRegisteredUser(newUser);
  };
  const handleregister = (e) => {
    if (registeredUser.password !== registeredUser.password2) {
      alert("Your Password did not Matched");
    }
    createUser(
      registeredUser.email,
      registeredUser.password,
      history,
      registeredUser.name
    );

    e.preventDefault();
  };
  return (
    <>
      <Navigation></Navigation>
      <Container>
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <h3 className="mt-5">Registration</h3>
            <Form className="my-5">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  onBlur={handleOnBlur}
                  name="name"
                  type="text"
                  required
                  placeholder="Enter Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onBlur={handleOnBlur}
                  name="email"
                  type="email"
                  required
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onBlur={handleOnBlur}
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onBlur={handleOnBlur}
                  name="password2"
                  type="password"
                  required
                  placeholder="Confirm Password"
                />
              </Form.Group>
              <small>Already Registered? </small>
              <Link to="/login">
                <small>
                  <u className="text-primary">Login</u>
                </small>
              </Link>
              <br />
              <Button
                onClick={handleregister}
                className="mt-3"
                variant="primary"
                type="submit"
              >
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Registration;
