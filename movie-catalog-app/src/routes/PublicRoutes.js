import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const userIsLogged = localStorage.getItem("token");

  return <div>{!userIsLogged ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default PublicRoutes;
