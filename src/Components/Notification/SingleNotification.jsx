import { notifIcon } from "../lib/ClassesName";

export default function SingleNotification() {
  return (
    <>
      <div className="flex">
        <div className={`${notifIcon}`}>
          <iconify-icon icon="ri:plant-line" />
        </div>
        Activity
        <br />
        Request to join from @userName
        <br /> <br />
        <div className="text-xs font-light italic">
          12 Feb 2024 <br />
          09:47AM
        </div>
      </div>
    </>
  );
}
