import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ActivityCard from "../ActivityCard";

import { pinkButton } from "../lib/ClassesName.jsx";

import TwoTabs from "../UiComponents/TwoTabs.jsx";

export default function Profile() {
  return (
    <>
      <ProfileHeader />
      <div className="mt-2 font-semibold">First Name Last Name</div>
      <div className="font-light italic">@userName</div>
      <div>Hello! I am a human.</div>
      <div className="flex justify-start">
        <Link to="/profile/setting">
          {/* view for non-account holder - button to show Follow or Following */}
          <button className={`${pinkButton} mr-4 mt-2`}>
            Edit Profile/Following
          </button>
        </Link>
        <Link to="/activity/add">
          <button className={`${pinkButton} mt-2`}>Add Activity</button>
        </Link>
      </div>
      <div className="mb-8" />
      <TwoTabs
        leftTitle="CURRENT"
        rightTitle="PAST"
        leftContent={<ActivityCard title="(Attendee)" />}
        rightContent={<ActivityCard />}
      />
    </>
  );
}
