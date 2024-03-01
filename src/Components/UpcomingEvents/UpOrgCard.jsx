import UserSummProfile from "../UiComponents/UserSummProfile";
import { chatIcon, RoundedAvatar } from "../lib/ClassesName";

export default function UpOrgCard() {
  return (
    <>
      <div className="lg:card-sides card mt-8 bg-primary shadow-xl">
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
            chat, calendar, delete
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
