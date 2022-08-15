import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "../pages/Timeline/index.jsx";
import Register from "../pages/Auth/SignUp/SignUp.jsx";
import Login from "../pages/Auth/Login/Login.jsx";
import UserPage from "../pages/UserPage/index.jsx";
import GlobalStyles from "../GlobalStyles";
import UserContext from "../contexts/UserContext.js";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const isAuthenticated = localStorage.getItem("isLogged");

  const userContext = {
    token,
    setToken,
    image,
    setImage,
    name,
    setName,
    userId,
    setUserId,
  };

  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserContext.Provider value={userContext}>
        <Routes>
          <Route element={<PublicRoute auth={isAuthenticated} />}>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoute auth={isAuthenticated} />}>
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/timeline/user/:id" element={<UserPage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
