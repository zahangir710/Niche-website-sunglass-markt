import React from "react";
import Footer from "../../Footer/Footer";
import DashboardNav from "../DashboardNav/DashboardNav";
import MyOrders from "../MyOrders/MyOrders";

const Dashboard = () => {
  return (
    <div>
      <DashboardNav></DashboardNav>
      <MyOrders></MyOrders>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
