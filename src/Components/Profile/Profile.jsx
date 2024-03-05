import { Link } from "react-router-dom";
import ActivityCard from "../UiComponents/ActivityCard.jsx";
import { pinkButton, semiBoldTxCen } from "../lib/ClassesName.jsx";
import TwoTabs from "../UiComponents/TwoTabs.jsx";
import PastActivityCard from "../UiComponents/PastActivityCard.jsx";
import { UserButton } from "@clerk/clerk-react";
import { CurrentUserContext } from "../lib/Constants";
import { useContext } from "react";

export default function Profile() {
  const currentUser = useContext(CurrentUserContext);

  const ProfileHeader = () => {
    return (
      <div className="flex items-center">
        <div className="avatar w-24 flex-none">
          <div className="rounded-full">
            <UserButton
              appearance={{
                elements: { avatarBox: "w-24 h-24" },
              }}
            />
          </div>
        </div>
        <Link to="/profile/follow" className="flex-auto">
          <div className="flex w-full justify-between">
            <div className={`${semiBoldTxCen} w-1/2`}>
              0 <br /> FOLLOWERS
            </div>
            <div className={`${semiBoldTxCen} w-1/2  `}>
              0 <br /> FOLLOWING
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>
      <ProfileHeader />
      <div className="mt-2 font-semibold">
        {currentUser?.firstName}
        {currentUser?.lastName}
      </div>
      <div className="font-light italic">@{currentUser?.username}</div>
      <div>{currentUser?.about}</div>
      <div className="flex justify-start">
        <Link to="/profile/setting">
          {/* view for non-account holder - button to show Follow or Following */}
          <button className={`${pinkButton} mr-4 mt-2`}>Edit Profile</button>
        </Link>
        <Link to="/activity/add">
          <button className={`${pinkButton} mt-2`}>Add Activity</button>
        </Link>
      </div>
      <div className="mb-6" />
      {/* <TwoTabs
        leftTitle="CURRENT"
        rightTitle="PAST"
        leftContent={
          <ActivityCard
            accOwnerImage="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            accOwnerUserName="Fiona"
            accOwnerStatus="(Attendee)"
            city="Hanoi"
            country="Vietnam"
            activityTitle="Fly Fly"
            date="23 Jan 2023"
            time="08:00AM"
            activityDescription="Feel like a garbage bag!"
            organiserImageURL="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            organiserFirstName="Tay Tay"
            organiserUsername="swiftieeee"
            activityImageURL="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
            categoryApiId={1}
            catergoryName="Fooddd"
          />
        }
        rightContent={<PastActivityCard userStatus="(Attendee)" />}
      /> */}
    </>
  );
}
