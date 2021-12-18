import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AuthRoute({ loggedIn }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  return loggedIn ? <Navigate to={`${from}`} /> : <Outlet />;
}

export function PrivateRoute({ loggedIn }) {
  const prevPath = window.location.pathname + window.location.search || "/";

  return loggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: prevPath }} />;
}
