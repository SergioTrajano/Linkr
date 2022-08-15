import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../context/userContext.js";
import GlobalStyles from "../GlobalStyles/index.jsx";
import PublicRoute from "./routes/PublicRoute.js";
import PrivateRoute from "./routes/PrivateRoute.js";
import { Login } from "./Auth/Login.jsx";
import SignUp from "./Auth/SignUp.jsx"
import Timeline from "./timeline/timeLineComponent.js";
import UserPage from "./users/userComponent.js";
import Header from "./Header/index.jsx";

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
        {isAuthenticated ? <Header /> : <></>}
        <Routes>
          <Route element={<PublicRoute auth={isAuthenticated} />}>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoute auth={isAuthenticated} />}>
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/user/:id" element={<UserPage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}