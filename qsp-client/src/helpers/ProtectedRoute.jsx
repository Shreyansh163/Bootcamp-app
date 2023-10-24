import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    let token = window.localStorage.getItem("user");
    let user = JSON.parse(token);
    console.log(user);
    console.log(token);
    if (user?.success === true) {
      return <div>{props.children}</div>;
    } else if (user === null) {
      return <Navigate to="/login" />;
    }  
}

export default ProtectedRoute