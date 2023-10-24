import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = props => {
  let token = window.localStorage.getItem("user");
  let user = JSON.parse(token);
  if (user?.success === true) {
    return <Navigate to="/profile" />;
  } else if (user === null) {
    return <>{props.children}</>;
  }
};

export default PublicRoute;
