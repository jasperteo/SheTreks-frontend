import { Link } from "react-router-dom";
import {
  notifIcon,
  notifActivityIcon,
  notifFollowerIcon,
  title,
} from "../lib/ClassesName";
import { truncateText } from "../lib/Constants";
import { BACKEND_URL, putRequest, formatDateandTime } from "../lib/Constants";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function ActivityNotification({ notification }) {
  //When message is rendered, set read status to true
  const markAsRead = useQuery({
    queryKey: [
      "markAsRead",
      `${BACKEND_URL}/users/notifications/read/${notification.id}`,
    ],
    queryFn: () =>
      putRequest(`${BACKEND_URL}/users/notifications/read/${notification.id}`),
    enabled: !!notification,
  });

  const generateNotifType = (notification) => {
    //returns true if message includes "event" for activity
    // and false if message includes "follow"
    let result = notification.notifMessage.includes("event");
    return result;
  };

  //Notification can either be activity = true or following = false
  const [activityNotif, setActivityNotif] = useState(
    generateNotifType(notification),
  );

  return (
    <>
      <Link to={activityNotif ? "../upcomingevents" : "../profile/follow"}>
        <div
          className={
            notification.read
              ? `card card-body glass mb-4 p-4`
              : `card card-body glass mb-4 bg-primary p-4`
          }
        >
          <div className="flex justify-between">
            <div className="flex items-start">
              <div className={`${notifIcon}`}>
                <iconify-icon
                  icon={activityNotif ? notifActivityIcon : notifFollowerIcon}
                />
              </div>
              <div className="ml-4 w-3/5">
                <p className="text-sm italic">
                  {activityNotif ? "Activity" : "Follower"}
                </p>
                {notification.notifMessage}
              </div>
            </div>
            <div className="w-2/5 text-xs font-light italic">
              {formatDateandTime(notification?.createdAt)}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
