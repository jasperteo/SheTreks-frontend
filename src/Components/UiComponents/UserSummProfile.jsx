import { RoundedAvatar } from "../lib/ClassesName";

export default function UserSummProfile() {
  return (
    <div className="flex">
      <div className="flex-none">
        <RoundedAvatar
          image="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          size="8"
        />
      </div>
      <div className="ml-2 mt-1 flex-auto">First Name</div>
      <div className="ml-2 mt-1 flex-auto font-light italic">@userName</div>
    </div>
  );
}
