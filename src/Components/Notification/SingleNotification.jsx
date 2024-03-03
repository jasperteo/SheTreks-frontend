import { chatIcon, notifIcon } from "../lib/ClassesName";
import { truncateText } from "../lib/Constants";

export default function ActivityNotification() {
  return (
    <>
      <div className="mb-4 flex justify-between">
        <div className="flex items-start">
          <div className={`${notifIcon}`}>
            <iconify-icon icon="ri:walk-line" />
          </div>
          <div className="ml-4 w-3/5">
            Activity <br />
            {truncateText("Request to join from @userName", 30)}
          </div>
        </div>
        <div className="w-1/5 text-xs font-light italic">
          12 Feb 2024 <br />
          09:47AM
        </div>
      </div>
      This is to update "Someone follows u"
      <div className={`${notifIcon}`}>
        <iconify-icon icon="ri:user-settings-line" />
      </div>
      This is for chat messages
      <div className={`${notifIcon}`}>
        <iconify-icon icon={chatIcon} />
      </div>
    </>
  );
}
