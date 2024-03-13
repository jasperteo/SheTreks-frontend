import { Link } from "react-router-dom";
import { lgreyIcon } from "./lib/ClassesName";
import RoundedAvatar from "./UiComponents/RoundedAvatar";

export default function NavBar({ currentUser }) {
  return (
    <>
      <div className="btm-nav fixed bottom-0 z-10 md:left-0 md:top-0 md:h-full md:w-1/12 md:flex-col md:justify-start md:bg-accent">
        <Link to="/feeds" className="bg-accent md:bg-transparent">
          <button className="bg-accent md:mt-8 md:block">
            <iconify-icon inline icon="ri:robot-2-line" class={lgreyIcon} />
          </button>
        </Link>
        <Link
          to="/explore"
          className="bg-accent md:mt-12 md:block md:bg-transparent"
        >
          <button className="bg-accent">
            <iconify-icon inline icon="ri:file-search-line" class={lgreyIcon} />
          </button>
        </Link>
        <Link
          to="/notifications"
          className="bg-accent md:block  md:bg-transparent "
        >
          <button className="bg-accent">
            <iconify-icon
              inline
              icon="ri:notification-2-line"
              class={lgreyIcon}
            />
          </button>
        </Link>
        <Link
          to="/upcomingevents"
          className="bg-accent md:block md:bg-transparent"
        >
          <button className="bg-accent">
            <iconify-icon
              inline
              icon="ri:calendar-event-line"
              class={lgreyIcon}
            />
          </button>
        </Link>
        <Link to="/profile" className="bg-accent md:mb-80 md:block md:p-2">
          <button className="mt-2 bg-accent">
            <RoundedAvatar image={currentUser?.imageUrl} />
          </button>
        </Link>
      </div>
    </>
  );
}
