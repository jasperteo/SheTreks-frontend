import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

export default function Profile() {
  return (
    <>
      <ProfileHeader />
      <div className="mt-2 font-semibold">First Name Last Name</div>
      <div className="font-light italic">@userName</div>
      <div>Hello! I am a human.</div>
      <div>
        <Link to="/profile/setting">
          <button>Edit Profile/Following</button>
        </Link>
      </div>
    </>
  );
}
