import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Products from "../../Products/Products";
import Navigation from "../../Shared/Navigation/Navigation";
import HomeBanner from "../HomeBanner/HomeBanner";
import "./Home.css";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  const [loadProduct, setLoadProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/home/products")
      .then((res) => res.json())
      .then((data) => setLoadProduct(data));
  }, []);
  return (
    <div>
      <Navigation></Navigation>
      <HomeBanner></HomeBanner>
      <h3 className="text-center my-5">Our Collections</h3>
      <div className="container products-container my-5">
        {loadProduct.map((product) => (
          <Products key={product._id} product={product}></Products>
        ))}
      </div>
      <div className="text-center">
        <Link to="/explore">
          <Button className="w-25 rounded my-5" variant="secondary">
            Load More
          </Button>
        </Link>
      </div>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
