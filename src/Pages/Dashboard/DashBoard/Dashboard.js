import React from "react";
import DashboardNav from "../DashboardNav/DashboardNav";
import MyOrders from "../MyOrders/MyOrders";

const Dashboard = () => {
  return (
    <div>
      <DashboardNav></DashboardNav>
      <MyOrders></MyOrders>
    </div>
  );
};

export default Dashboard;
