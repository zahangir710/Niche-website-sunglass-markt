import React, { useEffect, useState } from "react";
import Order from "../Order/Order";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {}, []);
  return (
    <div>
      <h1>This is My orders</h1>
      <Order></Order>
    </div>
  );
};

export default MyOrders;
