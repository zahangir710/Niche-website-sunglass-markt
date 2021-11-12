import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Products.css";

const Products = (props) => {
  const { name, price, category, img, description } = props.product;
  return (
    <Card className="text-center">
      <Card.Header>Categoty: {category}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" className="w-100 height" src={img} />
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="secondary">Buy Now</Button>
      </Card.Body>
      <Card.Footer className="text-muted">${price}</Card.Footer>
    </Card>
  );
};

export default Products;
