import React from "react";
import { Card } from "react-bootstrap";
import Rating from "react-rating";

const SingleReview = (props) => {
  const { rating, productName, category, review, reviewer, img } = props.review;
  return (
    <Card className="my-5" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Text>Categoty: {category}</Card.Text>
        <Rating
          readonly
          initialRating={rating}
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x text-warning"
        />
        <Card.Text className="mt-3">{review}</Card.Text>
        <Card.Text>Reviewer: {reviewer}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleReview;
