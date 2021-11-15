import React, { useEffect, useState } from "react";
import DashboardNav from "../../DashboardNav/DashboardNav";
import useAuth from "../../../../Hooks/useAuth";
import Products from "../../../Products/Products";
import { Button } from "react-bootstrap";
const ManageProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://hidden-refuge-12669.herokuapp.com/admin/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  const handleDelete = (id) => {
    console.log(id);
    const proceed = window.confirm("Confirm Delete?");
    if (proceed) {
      fetch(`https://hidden-refuge-12669.herokuapp.com/admin/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("Successfully Removed from Cart");
            const newProductsList = products.filter(
              (newProducts) => newProducts._id !== id
            );
            setProducts(newProductsList);
          }
        });
    }
  };

  return (
    <div>
      <DashboardNav></DashboardNav>
      <h2 className="text-center my-5">MANAGE PRDUCTS</h2>
      <h5 className="text-center">User: {user.email}</h5>
      <div className="container products-container my-5">
        {products.map((product) => (
          <Products key={product._id} product={product}>
            <Button onClick={() => handleDelete(product._id)} variant="warning">
              Delete Product
            </Button>
          </Products>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
