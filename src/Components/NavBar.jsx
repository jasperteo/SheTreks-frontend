import { Link } from "react-router-dom";
import { lgreyIcon } from "./lib/ClassesName";
import RoundedAvatar from "./UiComponents/RoundedAvatar";

export default function NavBar({ currentUser }) {
  return (
    <div className="btm-nav fixed bottom-0 z-10">
      <Link to="/feeds" className="bg-accent">
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:robot-2-line"
            class={lgreyIcon}
          ></iconify-icon>
        </button>
      </Link>
      <Link to="/explore" className="bg-accent">
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:file-search-line"
            class={lgreyIcon}
          ></iconify-icon>
        </button>
      </Link>
      <Link to="/notifications" className="bg-accent">
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:notification-2-line"
            class={lgreyIcon}
          ></iconify-icon>
        </button>
      </Link>
      <Link to="/upcomingevents" className="bg-accent">
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:calendar-event-line"
            class={lgreyIcon}
          ></iconify-icon>
        </button>
      </Link>
      <Link to="/profile" className="bg-accent">
        <button className="mt-2 bg-accent">
          <RoundedAvatar image={currentUser?.imageUrl} />
        </button>
      </Link>
    </div>
  );
}
