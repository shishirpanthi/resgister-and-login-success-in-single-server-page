import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../connecting register with login panel/Login/Login'
// import ImageNotice from '../noticeimage/ImageNotice'
import TeamMembersPage from './../adminpanel/Ourteam/TeamMembersPage';
import Registerform from '../connecting register with login panel/Registerform/Registerform'
// import ImageNotice from '../noticeimage/ImageNotice'
function Home() {
  return (
      <div>
      {/* <h1>welcome to home</h1>
      <ImageNotice />
  
      <Login /> */}
      {/* <ImageNotice /> */}
      <Login />
      {/* <Registerform /> */}
      <TeamMembersPage />
    </div>
  )
}

export default Home
