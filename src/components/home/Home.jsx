import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../Login/Login'
import ImageNotice from '../noticeimage/ImageNotice'
import ImageUpload from '../noticeimage/imageupload/ImageUpload'
import TeamMembersPage from './../Ourteam/TeamMembersPage';
function Home() {
  return (
      <div>
      <h1>welcome to home</h1>
      <ImageNotice />
      <ImageUpload />
      <Login />
      <TeamMembersPage />
      
    </div>
  )
}

export default Home
