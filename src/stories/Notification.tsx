import { MdCancel } from "react-icons/md";
import "./../stories/public/index.css";
import { RxCross2 } from "react-icons/rx";

type NotificationProps = {
    notificationThumbnail: string,
    time: Date,
    notificationText: string
}

export default function Notification({notificationText, notificationThumbnail, time}:NotificationProps) {
  /* Todo 
  Make an algorithm to show how old the notification is 
  */
  return (
    <div className="notification-container">
      <div className="notification-content">
        <div className="notification-thumbnail">
          <img src={notificationThumbnail} alt="" />
        </div>
        <div className="notification-text">
          <div className="notification-message">
            {notificationText}
          </div>
          <div className="notification-time">
            {time.getMilliseconds()}
          </div>
        </div>
      <div className="notification-close">
        <RxCross2 />
      </div>
      </div>
    </div>
  )
}