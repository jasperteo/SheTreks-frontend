import { Link } from "react-router-dom";
import { RoundedAvatar, lgreyIcon } from "./lib/ClassesName.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "./lib/Constants";

export default function NavBar() {
  // use Link to instead of useNavigate
  const currentUser = useContext(CurrentUserContext);
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
      <Link to="/activity/explore" className="bg-accent">
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
      <Link to={`/profile/${currentUser?.username}`} className="bg-accent">
        <button className="mt-2 bg-accent">
          <RoundedAvatar image="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </button>
      </Link>
    </div>
  );
}
