import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./components/SignupF/Signup";
import { Login } from "./components/LoginF/Login";
import {Home} from "./components/HomeF/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
