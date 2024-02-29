import { RoundedAvatar } from "./lib/Styles";

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
          <div className="font-semibold">Event Activity Title</div>
          <div className="font-light italic">Date, General Time</div>
          <div>Description</div>
        </div>
        <img
          className="-mt-2 object-none"
          src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
          alt="Activity Image"
        />
        <figure>
          <img src="/map.png" alt="map" />
        </figure>
      </div>
    </>
  );
}
