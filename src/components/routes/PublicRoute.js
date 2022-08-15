import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/userContext.js";

export default function PublicRoute({ auth }) {
  const { setToken, setImage, setName } = useContext(UserContext);
  const parseAuth = JSON.parse(auth);

  if (auth) {
    setName(parseAuth.name);
    setToken(parseAuth.token);
    setImage(parseAuth.image);
  }
  
  return auth ? <Navigate to="/timeline" /> : <Outlet />;
}
