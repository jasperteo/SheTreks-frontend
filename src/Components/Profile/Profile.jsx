import { useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

export default function Profile() {
  const nav = useNavigate();
  return (
    <>
      <ProfileHeader />
      <div className="mt-2 font-semibold">First Name Last Name</div>
      <div className="font-light italic">@userName</div>
      <div>Hello! I am a human.</div>
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
