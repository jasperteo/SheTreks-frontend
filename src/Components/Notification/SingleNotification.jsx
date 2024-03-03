import { Link } from "react-router-dom";
import { notifIcon } from "../lib/ClassesName";
import { truncateText } from "../lib/Constants";

export default function ActivityNotification({
  icon,
  title,
  message,
  date,
  time,
  colour,
  url,
}) {
  return (
    <>
      <Link to={url}>
        <div className={`card card-body glass mb-4 p-4 ${colour}`}>
          <div className="flex justify-between">
            <div className="flex items-start">
              <div className={`${notifIcon}`}>
                <iconify-icon icon={icon} />
              </div>
              <div className="ml-4 w-3/5">
                {title} <br />
                {truncateText(`${message}`, 30)}
              </div>
            </div>
            <div className="w-1/5 text-xs font-light italic">
              {date} <br />
              {time}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
