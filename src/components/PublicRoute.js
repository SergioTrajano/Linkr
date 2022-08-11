import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute({ auth }) {
  return auth ? <Navigate to="/timeline" /> : <Outlet />;
}
