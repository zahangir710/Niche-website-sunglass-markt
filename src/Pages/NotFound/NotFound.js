import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineDislike } from "react-icons/ai";

const NotFound = () => {
  return (
    <div className="container text-center my-5">
      <AiOutlineDislike className="fs-1" />
      <h1 className="text-primary mt-3 mb-5">404 Page not Found!!!</h1>
      <Link to="/home">
        <Button variant="warning">Go Back</Button>
      </Link>
    </div>
  );
};

export default NotFound;
