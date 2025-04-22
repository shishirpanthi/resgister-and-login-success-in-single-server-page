import React from 'react'
import RegisteredUserDetails from './RegisteredUserDetails/RegisteredUserDetails'
import Ourteam_card from './Ourteam/Ourteam_card'
import ImageUpload from '../imageupload/admin panel for image upload/ImageUpload'
import Services from '../services_card/Services'
import ImageSlider from '../imageslider/Sliderimage'
import Sliderimage from '../imageslider/Sliderimage'

function Admin() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <RegisteredUserDetails />
      <Ourteam_card />
      <ImageUpload />
      <Services />
      <Sliderimage />

   
     
      {/* <ImageUpload /> */}
      {/* <ImageNotice /> */}
      {/* <TeamMember/> */}
    </div>
  )
}

export default Admin
