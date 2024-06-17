import { MdHome, MdNotifications, MdSearch } from 'react-icons/md';
import { User } from '../models/user.model';
import './public/index.css';
import { RiProgress3Line } from 'react-icons/ri';

type SidebarProps = {
  isLoggedIn: boolean,
  userProfile: User,
  notificationCount: number
}

function Sidebar(Props:SidebarProps) {
  return (
    <div className="sidebar">
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
            <div className=''>
              <div className="sidebar-icon">
                <MdHome />
              </div>
              <div className="sidebar-link__text">
                Dashboard
              </div>
            </div>
            <div>
              <div className="sidebar-icon">
                <RiProgress3Line />
              </div>
              <div className="sidebar-link__text">
                Progress
              </div>
            </div>
            <div>
              <div className="sidebar-icon">
                <MdSearch />
              </div>
              <div className="sidebar-link__text">
                Browse
              </div>
            </div>
            <div>
              <div className="sidebar-icon notification">
                <div className="sidebar-notification-number">{Props.notificationCount}</div>
                <MdNotifications />
              </div>
              <div className="sidebar-link__text">
                Notifications
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar