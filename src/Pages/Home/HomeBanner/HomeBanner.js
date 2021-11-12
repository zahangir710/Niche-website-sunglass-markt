import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./HomeBanner.css";
const HomeBanner = () => {
  return (
    <Container fluid className="banner text-center text-light">
      <Row>
        <Col>
          <h1 className="pt-5">Sunglass Markt</h1>
          <p className="py-3">The Elegent Sunglasses you always wanted..</p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeBanner;
