import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function PublicRoute({ auth }) {
  const { setUser } = useContext(AuthContext);
  const parseAuth = JSON.parse(auth);
  setUser(parseAuth);

  return auth ? <Navigate to="/timeline" /> : <Outlet />;
}
