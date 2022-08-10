import { BrowserRouter,Routes,Route} from "react-router-dom";
import Timeline from "./Timeline";
import GlobalStyles from "../GlobalStyles";

export default function App() {

 

  return (
    
    <BrowserRouter>
      <GlobalStyles />
          <Routes>

          <Route path="/timeline" element={<Timeline />} />
          </Routes>
 
    </BrowserRouter> 

         
        
  );

}