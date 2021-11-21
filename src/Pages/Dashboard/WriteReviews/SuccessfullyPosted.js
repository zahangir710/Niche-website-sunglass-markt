import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import DashboardNav from "../DashboardNav/DashboardNav";

const SuccessfullyPosted = () => {
  return (
    <>
      <DashboardNav></DashboardNav>
      <div className="container mt-5 text-center place-footer">
        <AiOutlineLike className="fs-1 my-5" />
        <h3 className="text-success mb-5">Thank you for your review</h3>
        <Link to="/home">
          <small>Go to home</small>
        </Link>
        <p className="mt-3">or</p>
        <Link to="/dashboard">Review another product</Link>
      </div>
    </>
  );
};

export default SuccessfullyPosted;
