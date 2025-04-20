import React from 'react'
import RegisteredUserDetails from './RegisteredUserDetails/RegisteredUserDetails'
import Ourteam_card from './Ourteam/Ourteam_card'
import TeamMember from './Ourteam/TeamMembersPage'

function Admin() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <RegisteredUserDetails />
      <Ourteam_card />
      {/* <TeamMember/> */}
    </div>
  )
}

export default Admin
