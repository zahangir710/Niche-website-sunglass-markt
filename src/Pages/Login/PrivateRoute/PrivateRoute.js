import React from "react";
import { Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router";
import useAuth from "../../../Hooks/useAuth";

function PrivateRoute({ children, ...rest }) {
  let { user, isLoadding } = useAuth();
  if (isLoadding) {
    return (
      <div className="container text-center">
        <Spinner animation="border" variant="warning" />
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
