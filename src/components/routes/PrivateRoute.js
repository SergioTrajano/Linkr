import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/userContext.js";

export default function PrivateRoute({ auth }) {
  const { token, setToken, setImage, setName, setShowHeader } = useContext(UserContext);
  const parseAuth = JSON.parse(auth);
  if (auth && !token) {
    setName(parseAuth.name);
    setToken(parseAuth.token);
    setImage(parseAuth.image);
    setShowHeader(true);
  }
  if (!auth) return <Navigate to="/" />;
  if (auth && token) return <Outlet />;
  return <></>;
}