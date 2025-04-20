import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check token in localStorage
  const location = useLocation();

  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
