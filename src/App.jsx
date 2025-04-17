import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registerform from "./components/Registerform/Registerform";
import Login from "./components/Login/Login";
import Home from "./components/home/Home";
import Sending from "./components/sendingdata/Sending";
import SubmittedData from "./components/sendingdata/SubmittedData";
import Admin from "./components/dashboard for image upload/Admin";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registerform />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/sending" element={<Sending />} />
        <Route path="/submitted-data" element={<SubmittedData />} />
        <Route path="/admin" element={
          <Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
