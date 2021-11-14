import React from "react";
import { Button, Card } from "react-bootstrap";
import useAuth from "../../Hooks/useAuth";
import "./Products.css";

const Products = (props) => {
  const { user } = useAuth();
  const { name, price, category, img, description } = props.product;
  const handleAddToCart = (product) => {
    const { _id, ...addedProduct } = product;
    addedProduct["email"] = user.email;
    if (!user.email) {
      alert("Please Login/Register first");
    } else {
      fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addedProduct),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            alert("Added to the Cart");
          }
        });
    }
    
  };
  return (
    <Card className="text-center">
      <Card.Header>Categoty: {category}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" className="w-100 height" src={img} />
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button
          onClick={() => handleAddToCart(props.product)}
          variant="secondary"
        >
          Add to Cart
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">${price}</Card.Footer>
    </Card>
  );
};

export default Products;
