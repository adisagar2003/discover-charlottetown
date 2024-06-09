import { User } from '../models/user.model'
import './public/index.css'
import MapImage from "./assets/peimap.svg";
import UserImage from "./assets/sampleuser.jpg";
import { BsChevronDown, BsGraphUpArrow, BsJustify, BsPersonBadge } from "react-icons/bs";
import { CiSettings } from 'react-icons/ci';

// 
interface HeaderProps {
    isLoggedIn: boolean,
    userProfileData?: User
}

function Header({isLoggedIn, userProfileData}: HeaderProps) {

  //for controlling the navbar-user section dropdown
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
            {!isLoggedIn && 
            <div className="navbar-responsive">
                <BsJustify />
            </div>
            }
            {isLoggedIn && 
            <div className="navbar-user">
                <div className="navbar-user__invisible-wrapper"></div>
                <div className="navbar-user__profile">
                    <img className='navbar-user__image' src={UserImage} alt=""  />
                    <span>{`${userProfileData?.username}`}</span>
                    <BsChevronDown />
                </div>
                <div className="navbar-user__dropdown">
                    <div className="navbar-user__dropdown-element">My Account <BsPersonBadge /></div>
                    <div className="navbar-user__dropdown-element">Progress <BsGraphUpArrow /></div>
                    <div className="navbar-user__dropdown-element">Settings <CiSettings /></div>
                </div>
            </div>
            }
        </div>
    </div>
  )
}

export default Header