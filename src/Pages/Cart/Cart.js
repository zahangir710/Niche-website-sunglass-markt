import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import CartItem from "../CartItem/CartItem";
import Footer from "../Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";
import "./Cart.css";

const Cart = () => {
  const formRef = useRef();
  const [orderInfo, setOrderInfo] = useState({});
  const toggler = () => {
    setToggle(true);
  };
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/cart?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }, [user.email]);
  let total = 0;
  for (const i of cart) {
    total = total + parseFloat(i.price);
  }
  let delivery;
  total > 0 ? (delivery = 5) : (delivery = 0);
  const grandTotal = total + delivery;
  const handleRemove = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      fetch(`http://localhost:5000/cart/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("Successfully Removed from Cart");
            const newCart = cart.filter(
              (newProducts) => newProducts._id !== id
            );
            setCart(newCart);
          }
        });
    }
  };
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const updatedOrderInfo = { ...orderInfo };
    updatedOrderInfo[field] = value;
    setOrderInfo(updatedOrderInfo);
  };
  const handleOrder = (e) => {
    const proceed = window.confirm("Confirm Order?");
    if (proceed) {
      const newCart = { cart, ...orderInfo };
      newCart["email"] = user.email;
      newCart["status"] = "Pending";
      newCart["total"] = total;
      newCart["grandTotal"] = grandTotal.toFixed(2);
      newCart["delivery"] = delivery;

      fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newCart),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            alert("Order Placed Successfully");
            setCart([]);
            fetch(`http://localhost:5000/cart?email=${user.email}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {});
          }
        });
      e.preventDefault();
    }
  };
  return (
    <div>
      <Navigation></Navigation>
      <h3 className="text-center my-5">Review your Orders</h3>
      {cart.length < 1 ? (
        <div className="text-center empty-cart">
          <h5 className="mb-4">You have nothing in Cart yet</h5>
          <Link to="/explore">
            <Button variant="warning">Explore Products</Button>
          </Link>
        </div>
      ) : (
        <Container className="cart-container my-5">
          <div className="map-container">
            {cart.map((product) => (
              <CartItem
                key={product._id}
                product={product}
                handleRemove={handleRemove}
              ></CartItem>
            ))}
          </div>
          <div className="ms-5">
            <h4 className="mb-4">Cart Details</h4>
            <p>Total items: {cart.length}</p>
            <p>Total Price: {total.toFixed(2)}</p>
            <p>Delivery fees: ${delivery}</p>
            <p>Grand Total: ${grandTotal.toFixed(2)}</p>
            {!toggle ? (
              <Button onClick={toggler} variant="warning">
                Proceed to Checkout
              </Button>
            ) : (
              <Link to="/explore">
                <Button onClick={toggler} variant="warning">
                  Continue Shopping
                </Button>
              </Link>
            )}
            {/* delivery details */}
            {toggle && (
              <div>
                <h3 className="text-center my-5">Add Delivery Details</h3>
                <Form ref={formRef} onSubmit={handleOrder}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onBlur={handleOnBlur}
                    name="CustomerName"
                    className="mb-3"
                    required
                    type="text"
                    placeholder="Name"
                    defaultValue={user.displayName}
                  />
                  <Form.Label>Delivery ddress</Form.Label>
                  <Form.Control
                    name="address"
                    onBlur={handleOnBlur}
                    className="mb-3"
                    required
                    type="text"
                    placeholder="Address"
                  />
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    name="phone"
                    onBlur={handleOnBlur}
                    className="mb-5"
                    required
                    type="text"
                    placeholder="Ex: 01777777777777"
                  />
                  <Button variant="warning" type="submit">
                    Order Now
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </Container>
      )}
      <Footer></Footer>
    </div>
  );
};

export default Cart;
