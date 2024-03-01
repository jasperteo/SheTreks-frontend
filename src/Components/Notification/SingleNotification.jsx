import { notifIcon } from "../lib/Styles";

export default function SingleNotification() {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className={`${notifIcon}`}>
            <iconify-icon icon="ri:walk-line" />
          </div>
          <div className="ml-4">
            Activity
            <br />
            Request to join from @userName
          </div>
        </div>
        <div className="text-xs font-light italic">
          12 Feb 2024 <br />
          09:47AM
        </div>
      </div>
      Activity Follow request Chat request
      <iconify-icon icon="ri:user-settings-line"></iconify-icon>
    </>
  );
}
