import { MdArrowBack, MdHome, MdNotifications, MdSearch } from 'react-icons/md';
import { User } from '../models/user.model';
import './public/index.css';
import { RiProgress3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type SidebarProps = {
  isLoggedIn: boolean,
  userProfile: User,
  notificationCount: number
}

function Sidebar(Props:SidebarProps) {
  
  const [sidebarResponsiveVisible, setSidebarResponsiveVisible] = useState<boolean>(true);

  return (
    <>
        {!sidebarResponsiveVisible && <button className='sidebar-visible__button' onClick={()=> setSidebarResponsiveVisible(true)}><MdArrowBack /></button>}
        <div className={`sidebar ${sidebarResponsiveVisible ? "":"invisible"}`}>
        <div className="sidebar-responsive-cancel-button" onClick={()=>setSidebarResponsiveVisible(false)}>
          X
        </div>
        <div className="sidebar-content">
          <div className="sidebar-logo">
            <img src={"/ctown-logo.png"} alt="" />
          </div>
          <div className='sidebar-content__user'>
            <div className='sidebar-content__profile-picture'>
                <img src={Props.userProfile.profilePicture} />
            </div>
            <div className='sidebar-content__username-email'>
                <h2>
                  {Props.userProfile.username}
                </h2>
                <span>
                  {Props.userProfile.email}
                </span>
            </div>
          </div>
          <div className='sidebar-content__links'>
              <Link to="/" className=''>
                <div className="sidebar-icon">
                  <MdHome />
                </div>
                <div className="sidebar-link__text">
                  Dashboard
                </div>
              </Link>
              <Link to="/progress" className=''>
                <div className="sidebar-icon">
                  <RiProgress3Line />
                </div>
                <div className="sidebar-link__text">
                  Progress
                </div>
              </Link>
              <Link to="/search">
                <div className="sidebar-icon">
                  <MdSearch />
                </div>
                <div className="sidebar-link__text">
                  Browse
                </div>
              </Link >
              <Link to="/notifications">
                <div className="sidebar-icon notification">
                  <div className="sidebar-notification-number">{Props.notificationCount}</div>
                  <MdNotifications />
                </div>
                <div className="sidebar-link__text">
                  Notifications
                </div>
              </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar