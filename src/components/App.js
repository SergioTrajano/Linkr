import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../context/userContext.js";
import GlobalStyles from "../GlobalStyles/index.jsx";
import PublicRoute from "./routes/PublicRoute.js";
import PrivateRoute from "./routes/PrivateRoute.js";
import { Login } from "./Auth/Login.jsx";
import SignUp from "./Auth/SignUp.jsx"
import Timeline from "./Timeline/index.jsx";
import UserPage from "./Timeline/userComponent.js";
import Header from "./Header/index.jsx";
import HashTag from "./Hashtags/Hashtag.jsx";

export default function App() {
  const [token, setToken] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [showHeader, setShowHeader] = useState(false);

  const userContext = {
    token,
    setToken,
    image,
    setImage,
    name,
    setName,
    userId,
    setUserId,
    setShowHeader,
  };

  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserContext.Provider value={userContext}>
        {showHeader ? <Header /> : <></>}
        <Routes>
          <Route element={<PublicRoute auth={localStorage.getItem("isLogged")}/>}>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoute auth={localStorage.getItem("isLogged")}/>}>
            <Route path="/hashtag/:hashtag" element={<HashTag />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/user/:id" element={<UserPage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}