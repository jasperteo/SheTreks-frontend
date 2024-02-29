import { Link } from "react-router-dom";
import { RoundedAvatar, lgreyIcon } from "./lib/Styles";

export default function NavBar() {
  // use Link to instead of Nav

  return (
    <div className="btm-nav">
      <button className="bg-accent">
        <iconify-icon
          inline
          icon="ri:robot-2-line"
          class={lgreyIcon}
        ></iconify-icon>
      </button>
      <Link to="/activity" className="bg-accent">
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:function-add-line"
            class={lgreyIcon}
          ></iconify-icon>
        </button>
      </Link>
      <button className="bg-accent">
        <iconify-icon
          inline
          icon="ri:notification-2-line"
          class={lgreyIcon}
        ></iconify-icon>
      </button>
      <button className="bg-accent">
        <iconify-icon
          inline
          icon="ri:calendar-event-line"
          class={lgreyIcon}
        ></iconify-icon>
      </button>
      <Link to="/profile/username" className="bg-accent">
        <button className="mt-2 bg-accent">
          <RoundedAvatar image="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </button>
      </Link>
    </div>
  );
}
