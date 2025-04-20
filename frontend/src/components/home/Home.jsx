import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../connecting register with login panel/Login/Login'
import ImageNotice from '../noticeimage/ImageNotice'
import ImageUpload from '../noticeimage/imageupload/ImageUpload'
import TeamMembersPage from './../Ourteam/TeamMembersPage';
import Registerform from './/../connecting register with login panel/Registerform/Registerform'
function Home() {
  return (
      <div>
      {/* <h1>welcome to home</h1>
      <ImageNotice />
      <ImageUpload />
      <Login /> */}
      {/* <Login /> */}
      <Registerform />
      <TeamMembersPage />
      
    </div>
  )
}

export default Home
