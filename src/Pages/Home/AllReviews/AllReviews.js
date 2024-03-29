import React, { useEffect, useState } from "react";
import SingleReview from "../SingleReview/SingleReview";
import "./AllReviews.css";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://sunglass-markt-c5e4f9ab5a7f.herokuapp.com/review")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
      });
  }, []);
  return (
    <>
      <h2 className="text-center">Customers Reviews</h2>
      <div className="container all-review">
        {reviews.map((review) => (
          <SingleReview key={review._id} review={review}></SingleReview>
        ))}
      </div>
    </>
  );
};

export default AllReviews;
