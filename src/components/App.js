import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./Timeline";
import SignUp from "./SignUp";
import { Login } from "./Login";
import GlobalStyles from "../GlobalStyles";
import { AuthContext } from "../providers/AuthProvider";
import { useState } from "react";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
<<<<<<< HEAD
import HashTag from "./Hashtags/Hashtag.jsx";

=======
import HashTag from "./Hashtags/Hashtag.js";


>>>>>>> 9c86ed2155b63c8d0bf28e596df434f23f887b09
export default function App() {
  const [user, setUser] = useState();
  const isAuthenticated = localStorage.getItem("logged_in");

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser }}>
        <GlobalStyles />
        <Routes>
          <Route element={<PublicRoute auth={isAuthenticated} />}>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoute auth={isAuthenticated} />}>
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/hashtags" element={<HashTag />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
<<<<<<< HEAD
=======

>>>>>>> 9c86ed2155b63c8d0bf28e596df434f23f887b09
  );
}
