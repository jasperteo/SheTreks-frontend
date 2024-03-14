import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  notifIcon,
  notifActivityIcon,
  notifFollowerIcon,
  title,
} from "../lib/ClassesName";
import {
  BACKEND_URL,
  putRequest,
  formatDateandTime,
  truncateText,
} from "../lib/Constants";

export default function ActivityNotification({ notification }) {
  //When message is rendered, set read status to true
  useQuery({
    queryKey: [
      "markAsRead",
      `${BACKEND_URL}/users/notifications/read/${notification.id}`,
    ],
    queryFn: () =>
      putRequest(`${BACKEND_URL}/users/notifications/read/${notification.id}`),
    enabled: !!notification,
  });

  // true if message includes "follow"
  const notifType = notification.notifMessage.includes("follow");

  return (
    <Link to={notifType ? "/profile/follow" : "/upcomingevents"}>
      <div
        className={
          notification.read
            ? `card card-body glass mb-4 p-4`
            : `card card-body glass mb-4 bg-primary p-4`
        }
      >
        <div className="flex justify-between">
          <div className="flex items-start">
            <div className={`${notifIcon} w-12`}>
              <iconify-icon
                icon={notifType ? notifFollowerIcon : notifActivityIcon}
              />
            </div>
            <div className="ml-4 w-3/5">
              <p className="text-sm italic">
                {notifType ? "Follower" : "Activity"}
              </p>
              {notification.notifMessage}
            </div>
          </div>
          <div className="w-1/5 flex-shrink-0 text-xs font-light italic">
            {formatDateandTime(notification?.createdAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}
