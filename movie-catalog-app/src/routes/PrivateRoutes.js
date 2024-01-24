import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const userIsLogged = localStorage.getItem("token");

  return <div>{userIsLogged ? <Outlet /> : <Navigate to="/auth" />}</div>;
};

export default PrivateRoutes;
