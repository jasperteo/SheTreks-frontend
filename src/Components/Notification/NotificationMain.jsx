import { title } from "../lib/ClassesName";
import SingleNotification from "./SingleNotification";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL, CurrentUserContext, getRequest } from "../lib/Constants";
import { useContext } from "react";

export default function NotificationMain() {
  const currentUser = useContext(CurrentUserContext);

  //Gets users's notifications upon page load
  const allNotifications = useQuery({
    queryKey: [
      "notifications",
      `${BACKEND_URL}/users/notifications/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/notifications/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  return (
    <>
      <div className={`${title} mb-7`}>NOTIFICATIONS</div>
      {/* sort by: 1. unread messages, latest on top. set bg colour to primary
      color. Read messages, also latest on top. */}
      {/* unread notification to add in bg colour */}
      {allNotifications?.data?.map((notification) => (
        <SingleNotification key={notification.id} notification={notification} />
      ))}
    </>
  );
}
