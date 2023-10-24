import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./../apis/AuthContext";

const AdminRoute = props => {
  let { getMe } = useContext(AuthContext);
  let token = window.localStorage.getItem("user");
  let user = JSON.parse(token);
  console.log(user);
  console.log(token);

  if (user?.success === true && getMe?.data?.role === "admin") {
    return <div>{props.children}</div>;
  } else if (getMe?.data?.role === "user") {
    return <Navigate to="/profile" />;
  } else if (user === null) {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
