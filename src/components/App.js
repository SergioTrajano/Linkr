import { BrowserRouter,Routes,Route} from "react-router-dom";
import Timeline from "./Timeline";
import SignUp from "./SignUp";
import {Login} from "./Login"
import GlobalStyles from "../GlobalStyles";
import { AuthContext } from "../providers/AuthProvider";
import {useState} from 'react'

export default function App() {
const [user,setUser]=useState()

  return (
    
    <BrowserRouter>
      <AuthContext.Provider value={{user,setUser}}>
      <GlobalStyles />
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          </Routes>
      </AuthContext.Provider>
    </BrowserRouter> 

         
  );

}