import {
  chatIcon,
  notifActicityIcon,
  notifFollowerIcon,
  title,
} from "../lib/ClassesName";
import SingleNotification from "./SingleNotification";

export default function NotificationMain() {
  return (
    <>
      <div className={`${title} mb-7`}>NOTIFICATIONS</div>
      {/* sort by: 1. unread messages, latest on top. set bg colour to primary
      color. Read messages, also latest on top. */}
      {/* unread notification to add in bg colour */}
      <SingleNotification
        icon={notifActicityIcon}
        title="Activity"
        message="Join Request from @userName"
        date="22 Feb 2024"
        time="09:33AM"
        url="/activity/request"
        colour="bg-primary"
      />
      <SingleNotification
        icon={notifFollowerIcon}
        title="Follower"
        message="@userName starts to follow you."
        date="22 Feb 2024"
        time="09:33AM"
      />
      <SingleNotification
        icon={chatIcon}
        title="Chat"
        message="You have messages in XYZ Activity Chat."
        date="22 Feb 2024"
        time="09:33AM"
      />
    </>
  );
}
