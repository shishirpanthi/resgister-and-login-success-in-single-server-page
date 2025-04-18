import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ourteam_card from "./components/Ourteam/Ourteam_card";
import TeamMembersPage from "./components/Ourteam/TeamMembersPage";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ourteam_card />} />
        <Route path="/team-members" element={<TeamMembersPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home/Home";
// import Ourteam_card from "./components/Ourteam/Ourteam_card";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/ourteam" element={<Ourteam_card />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
