import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../Login/Login'
import ImageNotice from '../noticeimage/ImageNotice'
import ImageUpload from '../noticeimage/imageupload/ImageUpload'
function Home() {
  return (
      <div>
      <h1>welcome to home</h1>
      {/* <ImageNotice />
      <ImageUpload /> */}
          {/* <Login/> */}
      
    </div>
  )
}

export default Home;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TeamMembersCards from "../ourteam data sent to frontend/TeamMembersCards";

// const Home = () => {
//   const [teamData, setTeamData] = useState([]);

//   useEffect(() => {
//     const fetchTeamData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/ourteams");
//         const data = await response.json();
//         setTeamData(data);
//       } catch (error) {
//         console.error("Error fetching team data:", error);
//       }
//     };

//     fetchTeamData();
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to Our Team</h1>
//       <TeamMembersCards teamData={teamData} />
//     </div>
//   );
// };

// export default Home;