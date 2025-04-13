import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registerform from "./components/Registerform/Registerform";
import Login from "./components/Login/Login";
import Home from "./components/home/Home";
// import Sending from "./components/sendingdata/Sending";
// import SubmittedData from "./components/sendingdata/SubmittedData";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registerform />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/" element={<Sending />} />
        <Route path="/submitted-data" element={<SubmittedData />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
