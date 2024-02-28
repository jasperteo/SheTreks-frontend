import { useNavigate } from "react-router-dom";
import { RoundedAvatar } from "../lib/Styles";

export default function Profile() {
  const nav = useNavigate();
  return (
    <>
      <RoundedAvatar
        image="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        size="24"
      />
      First Name Last Name @userName
      <div>
        <button
          onClick={() => {
            nav("/profile/setting");
          }}
        >
          Edit Profile/Following
        </button>
      </div>
    </>
  );
}
