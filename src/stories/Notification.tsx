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
        
    </div>
  )
}