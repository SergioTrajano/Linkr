import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "../pages/Timeline/index.jsx";
import Register from "../pages/Auth/SignUp/SignUp.jsx";
import Login from "../pages/Auth/Login/Login.jsx";
import UserPage from "../pages/UserPage/index.jsx";
import GlobalStyles from "../GlobalStyles";
import UserContext from "../contexts/UserContext.js";
import { useState } from "react";
import HashTag from "./Hashtags/Hashtag.jsx";


export default function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [ userId, setUserId ] = useState('')

    const userContext = {
        token,
        setToken,
        image,
        setImage,
        name,
        setName,
        userId,
        setUserId
    };


  return (
    <BrowserRouter>
    <GlobalStyles />
    <UserContext.Provider value={userContext}>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Register/>} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/hashtags" element={<HashTag />} />
            <Route path="/timeline/user/:id" element={<UserPage />} />

         

        </Routes>
    </UserContext.Provider>
</BrowserRouter>
  );
}
