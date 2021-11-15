import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Footer from "../../Footer/Footer";
import Products from "../../Products/Products";
import Navigation from "../../Shared/Navigation/Navigation";
import AllReviews from "../AllReviews/AllReviews";
import HomeBanner from "../HomeBanner/HomeBanner";
import RequestProduct from "../RequestProduct/RequestProduct";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();
  const [loadProduct, setLoadProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/home/products")
      .then((res) => res.json())
      .then((data) => setLoadProduct(data));
  }, []);
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
    <div>
      <Navigation></Navigation>
      <HomeBanner></HomeBanner>
      <h3 className="text-center my-5">Our Collections</h3>
      <div className="container products-container my-5">
        {loadProduct.map((product) => (
          <Products key={product._id} product={product}>
            <Button
              onClick={() => handleAddToCart(product)}
              variant="secondary"
            >
              Add to Cart
            </Button>
          </Products>
        ))}
      </div>
      <div className="text-center">
        <Link to="/explore">
          <Button className="w-25 rounded my-5" variant="secondary">
            Load More
          </Button>
        </Link>
      </div>
      <AllReviews></AllReviews>
      <RequestProduct></RequestProduct>
      <Footer></Footer>
    </div>
  );
};

export default Home;
