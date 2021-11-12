import React from "react";
import useAuth from "../../../Hooks/useAuth";
import AddProducts from "../../AddProducts/AddProducts";

import Navigation from "../../Shared/Navigation/Navigation";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <Navigation></Navigation>
      <h1>This is Home {user.email}</h1>
      <AddProducts></AddProducts>
    </div>
  );
};

export default Home;
