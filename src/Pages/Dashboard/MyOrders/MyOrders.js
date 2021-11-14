import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import "./MyOrders.css";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/orders/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, [user.email]);
  const totalOrders = orders.length;
  return (
    <div className="container">
      <h4 className="text-center my-5">
        Number of Orders Placed: {totalOrders}
      </h4>

      <div className="display-item my-5">
        {orders.map((item, index) => (
          <div className="" key={index}>
            <h4>
              Delivery Address:{" "}
              <span className="text-success">{item.address}</span>{" "}
            </h4>
            <h6>
              Customer Name:{" "}
              {item.CustomerName ? item.CustomerName : user.displayName}
            </h6>
            <h6>Total items Aggregate: ${item.total}</h6>
            <h6>Delivery: ${item.delivery}</h6>

            <h6 className="">
              Grand Total: $
              <span className="text-danger">{item.grandTotal}</span>
            </h6>
            <h6 className="mb-4">
              Order Status: <span className="text-danger">{item.status}</span>
            </h6>
            {item.status === "Pending" && (
              <Button className="mb-5" variant="warning">
                Cancle Order
              </Button>
            )}
            {item.cart.map((c, i) => (
              <div className="mb-5">
                <div key={i}>
                  <img className="w-75" src={c.img} alt="" />
                  <p>
                    {c.name} || Price: {c.price}
                  </p>
                  <Link to={`writereviews/${c.name}`}>
                    <Button className="mb-5" variant="warning">
                      Write a Review
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
