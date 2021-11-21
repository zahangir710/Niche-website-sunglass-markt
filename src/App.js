import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import Explore from "./Pages/Explore/Explore";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import Dashboard from "./Pages/Dashboard/DashBoard/Dashboard";
import Cart from "./Pages/Cart/Cart";
import WriteReviews from "./Pages/Dashboard/WriteReviews/WriteReviews";
import NotFound from "./Pages/NotFound/NotFound";
import MakeAdmin from "./Pages/Dashboard/Admin/MakeAdmin/MakeAdmin";
import ManageProducts from "./Pages/Dashboard/Admin/ManageProducts/ManageProducts";
import Payment from "./Pages/Dashboard/Payment/Payment";
import MyReviews from "./Pages/Dashboard/MyReviews/MyReviews";
import AddProducts from "./Pages/AddProducts/AddProducts";
import SuccessfullyPosted from "./Pages/Dashboard/WriteReviews/SuccessfullyPosted";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/registration">
            <Registration></Registration>
          </Route>
          <Route path="/explore">
            <Explore></Explore>
          </Route>
          <PrivateRoute path="/cart">
            <Cart></Cart>
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute path="/makeadmin">
            <MakeAdmin></MakeAdmin>
          </PrivateRoute>
          <PrivateRoute path="/manageproducts">
            <ManageProducts></ManageProducts>
          </PrivateRoute>
          <PrivateRoute path="/writereviews/:productId">
            <WriteReviews></WriteReviews>
          </PrivateRoute>
          <PrivateRoute path="/payment">
            <Payment></Payment>
          </PrivateRoute>
          <PrivateRoute path="/myreviews">
            <MyReviews></MyReviews>
          </PrivateRoute>
          <PrivateRoute path="/addproduct">
            <AddProducts></AddProducts>
          </PrivateRoute>
          <PrivateRoute path="/successfully_posted">
            <SuccessfullyPosted></SuccessfullyPosted>
          </PrivateRoute>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
