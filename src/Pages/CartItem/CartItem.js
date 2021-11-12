import React from "react";
import { Button, Card } from "react-bootstrap";

const CartItem = (props) => {
  const { name, img, price, _id } = props.product;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{price}</Card.Text>
        <Button onClick={() => props.handleRemove(_id)} variant="warning">
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
