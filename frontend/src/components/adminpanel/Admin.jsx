import React from 'react'
import RegisteredUserDetails from './RegisteredUserDetails/RegisteredUserDetails'
import Ourteam_card from './Ourteam/Ourteam_card'
import ImageUpload from '../imageupload/admin panel for image upload/ImageUpload'

function Admin() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <RegisteredUserDetails />
      <Ourteam_card />
      <ImageUpload />
   
     
      {/* <ImageUpload /> */}
      {/* <ImageNotice /> */}
      {/* <TeamMember/> */}
    </div>
  )
}

export default Admin
