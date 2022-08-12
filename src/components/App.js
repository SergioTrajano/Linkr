import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./Timeline";
import SignUp from "./SignUp";
import { Login } from "./Login";
import GlobalStyles from "../GlobalStyles";
<<<<<<< HEAD
import { AuthContext } from "../providers/AuthProvider";
import { useState } from "react";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
=======
import HashTag from "./Hashtags/Hashtag.jsx";

export default function App() {
>>>>>>> 4cc0390b98fe0c2a520f845c2519978ac7a522d0

export default function App() {
  const [user, setUser] = useState();
  const isAuthenticated = localStorage.getItem("logged_in");

  return (
    <BrowserRouter>
<<<<<<< HEAD
      <AuthContext.Provider value={{ user, setUser }}>
        <GlobalStyles />
        <Routes>
          <Route element={<PublicRoute auth={isAuthenticated} />}>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoute auth={isAuthenticated} />}>
            <Route path="/timeline" element={<Timeline />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
=======
      <GlobalStyles />
          <Routes>

          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hashtags" element={<HashTag />} />
          </Routes>
 
    </BrowserRouter> 

         
        
>>>>>>> 4cc0390b98fe0c2a520f845c2519978ac7a522d0
  );
}
