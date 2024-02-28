import { RoundedAvatar } from "../lib/Styles";

export default function ProfileHeader() {
  return (
    <>
      <div className="flex">
        <div className="avatar w-20 flex-none">
          <div className="w-28 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        {/* <div className="w-36 flex-initial">
          <RoundedAvatar
            image="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            size="28"
          />
        </div> */}
        <div className="bold-text w-32 flex-auto ">
          0 <br /> FOLLOWERS
        </div>
        <div className="bold-text w-32 flex-auto ">
          0 <br /> FOLLOWERING
        </div>
      </div>
    </>
  );
}
