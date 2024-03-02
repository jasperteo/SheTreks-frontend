import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ActivityCard from "../ActivityCard";
import RequestCard from "../Activity/Individual/RequestCard.jsx";
import { pinkButton } from "../lib/ClassesName.jsx";

export default function Profile() {
  return (
    <>
      <ProfileHeader />
      <div className="mt-2 font-semibold">First Name Last Name</div>
      <div className="font-light italic">@userName</div>
      <div>Hello! I am a human.</div>
      <div className="flex justify-center">
        <Link to="/profile/setting">
          <button className={`${pinkButton} absolute left-8  mt-2`}>
            Edit Profile/Following
          </button>
        </Link>
        <Link to="/activity/add">
          <button className={`${pinkButton} mt-2`}>Add Activity</button>
        </Link>
      </div>
      <div className="mb-8" />
      <ActivityCard />
      <RequestCard />
    </>
  );
}
