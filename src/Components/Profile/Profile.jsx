import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ActivityCard from "../ActivityCard";
import RequestCard from "../RequestCard";
import { pinkButton } from "../lib/Styles";

export default function Profile() {
  return (
    <>
      <ProfileHeader />
      <div className="mt-2 font-semibold">First Name Last Name</div>
      <div className="font-light italic">@userName</div>
      <div>Hello! I am a human.</div>
      <Link to="/profile/setting">
        <button className={`${pinkButton} -mb-2 mt-2`}>
          Edit Profile/Following
        </button>
      </Link>
      <div className="-mb-12"></div>
      <ActivityCard />
      <RequestCard />
    </>
  );
}
