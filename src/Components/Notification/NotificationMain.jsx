import { title } from "../lib/ClassesName";
import SingleNotification from "./SingleNotification";

export default function NotificationMain() {
  return (
    <>
      <div className={`${title}`}>NOTIFICATIONS</div>
      <SingleNotification />
    </>
  );
}
