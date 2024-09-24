import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./components/SignupF/Signup";
import { Login } from "./components/LoginF/Login";
import {Home} from "./components/HomeF/Home";
import { AdminDash } from "./components/AdminF/AdminDash";
import { CustomerDash } from "./components/CustomerF/CustomerDash";
import { TechnicianDash } from "./components/TechnicianF/TechnicianDash";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDash/>}/>
          <Route path="/customer" element={<CustomerDash/>}/>
          <Route path="/technician" element={<TechnicianDash/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
