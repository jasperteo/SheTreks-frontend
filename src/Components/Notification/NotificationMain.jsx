import { title } from "../lib/Styles";
import SingleNotification from "./SingleNotification";

export default function NotificationMain() {
  return (
    <>
      <div className={`${title}`}>NOTIFICATIONS</div>
      <SingleNotification />
    </>
  );
}
