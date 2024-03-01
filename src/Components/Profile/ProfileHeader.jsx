import { semiBoldTxCen } from "../lib/Styles";

export default function ProfileHeader() {
  return (
    <>
      <div className="flex items-center">
        <div className="avatar w-24 flex-none">
          <div className="rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className={`${semiBoldTxCen} w-32 flex-auto`}>
          0 <br /> FOLLOWERS
        </div>
        <div className={`${semiBoldTxCen} w-32 flex-auto `}>
          0 <br /> FOLLOWING
        </div>
      </div>
    </>
  );
}
