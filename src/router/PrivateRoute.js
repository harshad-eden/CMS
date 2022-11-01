import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem("cms-auth")
    ? localStorage.getItem("cms-auth")
    : false;
  return auth ? children : <Navigate to="/login" replace />;
};
