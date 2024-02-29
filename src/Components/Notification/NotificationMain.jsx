import { semiBoldTxCen } from "../lib/Styles";
import SingleNotification from "./SingleNotification";

export default function NotificationMain() {
  return (
    <>
      <div className={`${semiBoldTxCen}`}>NOTIFICATIONS</div>
      <SingleNotification />
    </>
  );
}
