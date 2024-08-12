import Notification from "../stories/Notification";
import "./notification.page.css";
export default function NotificationPage() {
  return (
    <div className="notification-page">
      <div className="notification-heading">
        Feature Coming Soon
      </div>
        <div className="notifications-container">
            <Notification notificationThumbnail="https://preview.redd.it/for-anyone-that-wanted-to-have-the-aang-picture-on-this-v0-rwy8095bx8ba1.jpg?width=640&crop=smart&auto=webp&s=d09057e988597782c9f38ce6bbfe8f59bcdf8ea9" notificationText="notification 0" time={new Date()} />
            <Notification notificationThumbnail="https://avatarfiles.alphacoders.com/336/336818.jpg" notificationText="notification1" time={new Date()} />
            <Notification notificationThumbnail="https://i.pinimg.com/originals/98/dd/75/98dd7516aef62433e7acb4cd55872224.jpg" notificationText="notification 3" time={new Date()} />
        </div>
    </div>
  )
}