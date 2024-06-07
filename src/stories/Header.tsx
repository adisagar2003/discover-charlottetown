import React from 'react'
import { User } from '../models/user.model'
import './public/index.css'
import MapImage from "./assets/peimap.svg";
import UserImage from "./assets/sampleuser.jpg";
import { BsChevronDown } from "react-icons/bs";

// 
interface HeaderProps {
    isLoggedIn: boolean,
    userProfileData?: User
}

function Header({isLoggedIn, userProfileData}: HeaderProps) {
  return (
    <div className='navbar'>
        <div className="navbar-content">
            <div className="navbar-logo">
                <img src={MapImage} alt="map of prince edward island"/>
            </div>
            <div className="navbar-links">
                <a href="" className="navbar-links__link">Login</a>
                <a href="" className="navbar-links__link">Logout</a>
                <a href="" className="navbar-links__link">Register</a>
            </div>
            {isLoggedIn && 
            <div className="navbar-user">
                <div className="navbar-user__profile">
                    <img className='navbar-user__image' src={UserImage} alt=""  />
                    <span>{userProfileData?.username}</span>
                    <BsChevronDown />
                </div>
            </div>
            }
        </div>
    </div>
  )
}

export default Header