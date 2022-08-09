import { BrowserRouter,Routes,Route} from "react-router-dom";
import Timeline from "./Timeline";
import SignUp from "./SignUp";
import {Login} from "./Login"
import GlobalStyles from "../GlobalStyles";

export default function App() {


  return (
    
    <BrowserRouter>

      <GlobalStyles />
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          </Routes>
 
    </BrowserRouter> 

         
  );

}