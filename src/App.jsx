import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ourteam_card from "./components/Ourteam/Ourteam_card";
import TeamMembersPage from "./components/Ourteam/TeamMembersPage";
import Home from "./components/home/Home";
import Login from "./components/connecting register with login panel/Login/Login";
import Registerform from "./components/connecting register with login panel/Registerform/Registerform";
import Admin from "./components/adminpanel/Admin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  // Example: Replace this with your actual authentication logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/ourteam" element={<Ourteam_card />} />
        <Route path="/team-members" element={<TeamMembersPage />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Registerform />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute
              element={<Admin />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
