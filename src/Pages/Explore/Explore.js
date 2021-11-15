import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useAuth from "../../Hooks/useAuth";
import Footer from "../Footer/Footer";
import Products from "../Products/Products";
import Navigation from "../Shared/Navigation/Navigation";

const Explore = () => {
  const { user } = useAuth();
  const [loadProduct, setLoadProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
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
      <Footer></Footer>
    </div>
  );
};
export default Explore;
