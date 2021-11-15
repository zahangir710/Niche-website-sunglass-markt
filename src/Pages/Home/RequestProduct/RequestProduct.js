import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const RequestProduct = () => {
  return (
    <Container className="my-5">
      <div className="text-center">
        <h3>Can't find the product you are looking for?</h3>
        <h4>Please send us request below, we will make it Available ASAP!!!</h4>
      </div>
      <Form>
        <Row>
          <Col>
            <Form.Control placeholder="Enter Product Name/Brand" />
          </Col>
          <Col>
            <Form.Control placeholder="Enter Product image URL" />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default RequestProduct;
