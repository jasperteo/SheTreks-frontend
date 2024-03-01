import UserSummProfile from "./UiComponents/UserSummProfile";
import {
  RoundedAvatar,
  dPinkIcon,
  darkPinkButton,
  lgreyIcon,
} from "./lib/Styles";

export default function ActivityCard() {
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
              @userName
            </div>
          </div>
          <div className="font-semibold">Hanoi, Vietnam</div>

          <div className="font-semibold">Event Activity Title</div>

          <div className="font-light italic">Date, General Time</div>
          <div>Description</div>
          <div className="flex">
            <div className={`${dPinkIcon}`}>
              <iconify-icon inline icon="ri:plant-line" />
            </div>
            <div className="mt-2 text-xs"> Event Category</div>
          </div>
        </div>
        <img
          className="-mt-2 object-none"
          src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
          alt="Activity Image"
        />
        <figure>
          <img src="/map.png" alt="map" />
        </figure>
        <div className="card-body -mb-4">
          <button className={`${darkPinkButton} mb-4 text-grey`}>
            JOIN NOW
          </button>
          {/* for oragniser view */}
          <div className="-mt-2 font-semibold">Participants:</div>
          <UserSummProfile />
          <button className={`${darkPinkButton} mb-4 text-grey`}>
            <iconify-icon icon="ri:chat-4-line" class={lgreyIcon} />
            DISCUSS PROGRAMME
          </button>
        </div>
      </div>
    </>
  );
}
