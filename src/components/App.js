import { BrowserRouter,Routes,Route} from "react-router-dom";
import Timeline from "./Timeline";
import GlobalStyles from "../GlobalStyles";
import HashTag from "./Hashtags/Hashtag.jsx";

export default function App() {

 

  return (
    
    <BrowserRouter>
      <GlobalStyles />
          <Routes>

          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hashtags" element={<HashTag />} />
          </Routes>
 
    </BrowserRouter> 

         
        
  );

}