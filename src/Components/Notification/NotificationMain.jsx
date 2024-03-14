import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { title } from "../lib/ClassesName";
import { BACKEND_URL, getRequest } from "../lib/Constants";
import SingleNotification from "./SingleNotification";

export default function NotificationMain() {
  const currentUser = useOutletContext();

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
      {notifications?.data?.map((notification) => (
        <SingleNotification key={notification.id} notification={notification} />
      ))}
    </>
  );
}
