import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import DashboardNav from "../DashboardNav/DashboardNav";
import Footer from "../../Footer/Footer";
import "./WriteReviews.css";

const WriteReviews = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      });
  }, [productId]);
  const [review, setReview] = useState({});
  const [postConfirmation, setPostConfirmation] = useState(false);
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newReview = { ...review };
    newReview[field] = value;
    console.log(newReview);
    setReview(newReview);
  };
  const handlePostReview = (e) => {
    review["reviewer"] = user.displayName;
    review["email"] = user.email;
    review["img"] = product.img;
    review["productName"] = product.name;
    review["category"] = product.category;
    console.log(review);
    if (review.review.length > 0 && review?.rating?.length > 0) {
      fetch("http://localhost:5000/review", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(review),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            alert("Review Posted Successfully");
            setPostConfirmation(true);
            setProduct({});
          }
        });
    } else {
      alert("Review field can not be empty & Choose a Rating option");
    }
    e.preventDefault();
  };
  if (postConfirmation) {
    return (
      <>
        <div className="container mt-5 text-center place-footer">
          <AiOutlineLike className="fs-1 my-5" />
          <h3 className="text-success mb-5">Thank you for your review</h3>
          <Link to="/home">
            <small>Go to home</small>
          </Link>
          <p className="mt-3">or</p>
          <Link to="/dashboard">Review another product</Link>
        </div>
        <Footer></Footer>
      </>
    );
  }
  return (
    <>
      <DashboardNav></DashboardNav>
      <Container className="text-center my-5">
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }} lg={6}>
            <Card className="border-0">
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Text>{product.name}</Card.Text>
                <Card.Text>${product.price}</Card.Text>
              </Card.Body>
              <FloatingLabel
                className="mb-3"
                controlId="floatingSelect"
                label="Rate this Product (5 is the Best)"
              >
                <Form.Select
                  name="rating"
                  onBlur={handleOnBlur}
                  aria-label="Floating label select example"
                >
                  <option className="text-danger fs-5 fw-bold" value="1">
                    1
                  </option>
                  <option className="text-danger fs-4 fw-bold" value="2">
                    2
                  </option>
                  <option className="text-warning fs-3 fw-bold" value="3">
                    3
                  </option>
                  <option className="text-warning fs-2 fw-bold" value="4">
                    4
                  </option>
                  <option className="text-success fs-1 fw-bold" value="5">
                    5
                  </option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
                className="mb-3"
              >
                <Form.Control
                  required="true"
                  onBlur={handleOnBlur}
                  name="review"
                  as="textarea"
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
              <Button onClick={handlePostReview} variant="warning">
                Post product Review
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default WriteReviews;
