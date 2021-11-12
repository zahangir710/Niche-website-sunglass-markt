import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Navigation from "../Shared/Navigation/Navigation";

const Login = () => {
  const { login } = useAuth();
  const [loginCredential, setLoginCredential] = useState({});
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const userCredential = { ...loginCredential };
    userCredential[field] = value;
    console.log(userCredential);
    setLoginCredential(userCredential);
  };
  const handleLogin = (e) => {
    login(loginCredential.email, loginCredential.password);
    e.preventDefault();
  };
  return (
    <>
      <Navigation></Navigation>
      <Container>
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <h3 className="mt-5">Login</h3>
            <Form onSubmit={handleLogin} className="my-5">
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
              <small>New to the site? </small>
              <Link to="/registration">
                <small>
                  <u className="text-primary">Register</u>
                </small>
              </Link>
              <br />
              <Button className="mt-3" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
