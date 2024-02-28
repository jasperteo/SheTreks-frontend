import { useNavigate, Outlet } from "react-router-dom";
import { RoundedAvatar } from "./lib/Styles";

export default function NavBar() {
  const nav = useNavigate();

  // use Link to instead of Nav

  return (
    <>
      <div className="btm-nav">
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:robot-2-line"
            class="lightgrey-icon "
          ></iconify-icon>
        </button>
        <button
          className="bg-accent"
          onClick={() => {
            nav("/activity");
          }}
        >
          <iconify-icon
            inline
            icon="ri:function-add-line"
            class="lightgrey-icon "
          ></iconify-icon>
        </button>
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:notification-2-line"
            class="lightgrey-icon "
          ></iconify-icon>
        </button>
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:calendar-event-line"
            class="lightgrey-icon"
          ></iconify-icon>
        </button>
        <button
          className="bg-accent"
          onClick={() => {
            nav("/profile/userID");
          }}
        >
          <RoundedAvatar
            image="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            size="8"
          />
        </button>
      </div>
      <Outlet />
    </>
  );
}
