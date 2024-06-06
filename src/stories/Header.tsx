import React from 'react'
import { User } from '../models/user.model'

// 
interface HeaderProps {
    isLoggedIn: boolean,
    userProfileData?: User
}

function Header({isLoggedIn}: HeaderProps) {
  return (
    <div>Header</div>
  )
}

export default Header