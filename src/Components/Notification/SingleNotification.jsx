import { notifIcon } from "../lib/Styles";

export default function SingleNotification() {
  return (
    <>
      <div className={`${notifIcon}`}>
        <iconify-icon icon="ri:plant-line" />
      </div>
      <br />
      Category Type of Request Date Time
    </>
  );
}
