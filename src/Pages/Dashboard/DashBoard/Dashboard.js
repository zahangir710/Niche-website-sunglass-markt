import React from "react";
import useAuth from "../../../Hooks/useAuth";
import Footer from "../../Footer/Footer";
import ManageOrders from "../Admin/ManageOrders/ManageOrders";
import DashboardNav from "../DashboardNav/DashboardNav";
import MyOrders from "../MyOrders/MyOrders";

const Dashboard = () => {
  const { admin } = useAuth();
  return (
    <div>
      <DashboardNav></DashboardNav>
      {admin ? <ManageOrders></ManageOrders> : <MyOrders></MyOrders>}
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
