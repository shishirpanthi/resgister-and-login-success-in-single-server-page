import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../connecting register with login panel/Login/Login'
// import ImageNotice from '../noticeimage/ImageNotice'
import TeamMembersPage from './../adminpanel/Ourteam/TeamMembersPage';
import Registerform from '../connecting register with login panel/Registerform/Registerform'
import Gallery from '../imageupload/show in Another component img/Gallery';
import ServicesView from '../services_card/receiving the data from backend/ServicesView';


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
      <Gallery />
      <ServicesView />
    </div>
  );
}

export default Home
