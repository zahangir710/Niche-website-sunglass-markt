import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Products from "../Products/Products";
import Navigation from "../Shared/Navigation/Navigation";

const Explore = () => {
  const [loadProduct, setLoadProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setLoadProduct(data));
  }, []);
  return (
    <div>
      <Navigation></Navigation>
      <h3 className="text-center my-5">Our Collections</h3>
      <div className="container products-container my-5">
        {loadProduct.map((product) => (
          <Products key={product._id} product={product}></Products>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Explore;
