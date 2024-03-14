import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { title } from "../lib/ClassesName";
import { BACKEND_URL, getRequest } from "../lib/Constants";
import SingleNotification from "./SingleNotification";

export default function NotificationMain() {
  const currentUser = useOutletContext();

  //Gets users's notifications upon page load
  const notifications = useQuery({
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
      {notifications?.data?.map((notification) => (
        <SingleNotification key={notification.id} notification={notification} />
      ))}
    </>
  );
}
