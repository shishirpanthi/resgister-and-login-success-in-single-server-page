import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../Login/Login'
import ImageNotice from '../noticeimage/ImageNotice'
import ImageUpload from '../imageupload/ImageUpload'
function Home() {
  return (
      <div>
      <h1>welcome to home</h1>
      <ImageNotice />
      <ImageUpload />
          <Login/>
      
    </div>
  )
}

export default Home
