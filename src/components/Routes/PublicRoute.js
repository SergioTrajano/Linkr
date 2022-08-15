import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext.js";

export default function PublicRoute({ auth }) {
  const { token, setToken, setImage, setName } = useContext(UserContext);
  const parseAuth = JSON.parse(auth);
  console.log(token);
  if (auth) {
    setName(parseAuth.name);
    setToken(parseAuth.token);
    setImage(parseAuth.image);
  }
  return auth ? <Navigate to="/timeline" /> : <Outlet />;
}
