import { Link } from "react-router-dom";
import UserSummProfile from "../UiComponents/UserSummProfile";
import { chatIcon, RoundedAvatar } from "../lib/ClassesName";

export default function UpJoinCard() {
  return (
    <>
      <div className="lg:card-sides card mt-8 bg-grey shadow-xl">
        <div className="card-body">
          <div className="flex">
            <div className="flex-none">
              <RoundedAvatar
                image="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                size="8"
              />
            </div>
            <div className="ml-2 mt-1 flex-auto font-light italic">
              @organiser
            </div>
            <Link to="/">
              <iconify-icon
                icon={chatIcon}
                class="mr-2 text-3xl text-secondary"
              />
            </Link>
            <Link to="/">
              <iconify-icon
                icon="ri:calendar-check-line"
                class="mr-2 text-3xl text-success"
              />
            </Link>
            <Link to="/">
              <iconify-icon
                icon="ri:delete-bin-line"
                class="text-3xl text-neutral"
              />
            </Link>
          </div>

          <div className="font-semibold">Hanoi, Vietnam</div>
          <div className="font-semibold">Event Activity Title</div>
          <div>Date, Exact Time</div>
          <div>Address</div>
          <div className="font-semibold">Participants:</div>
          <UserSummProfile />
        </div>
        <figure>
          <img src="/map.png" alt="map" />
        </figure>
      </div>
    </>
  );
}
