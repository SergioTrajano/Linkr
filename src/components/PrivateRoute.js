import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function PrivateRoute({ auth }) {
  const { user, setUser } = useContext(AuthContext);
  const parseAuth = JSON.parse(auth);
  if (!user) setUser(parseAuth);
  return auth ? <Outlet /> : <Navigate to="/" />;
}
