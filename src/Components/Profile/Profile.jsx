import { Link } from "react-router-dom";
import ActivityCard from "../UiComponents/ActivityCard.jsx";
import { pinkButton, semiBoldTxCen } from "../lib/ClassesName.jsx";
import TwoTabs from "../UiComponents/TwoTabs.jsx";
import PastActivityCard from "../UiComponents/PastActivityCard.jsx";
import { useParams } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getRequest, BACKEND_URL, CurrentUserContext } from "../lib/Constants";
import { useContext } from "react";

export default function Profile() {
  const params = useParams();
  const currentUser = useContext(CurrentUserContext);

  const profile = useQuery({
    queryKey: [
      "profile",
      currentUser,
      `${BACKEND_URL}/users/profile/${params.username}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/profile/${params.username}`),
    enabled: params.username !== currentUser?.username,
  });

  const ProfileHeader = () => {
    return (
      <div className="flex items-center">
        <div className="avatar w-24 flex-none">
          <div className="rounded-full">
            {params.username === currentUser?.username ? (
              <UserButton
                appearance={{
                  elements: { avatarBox: "w-24 h-24" },
                }}
              />
            ) : (
              <img src={profile.data?.imageUrl} />
            )}
          </div>
        </div>
        <div className={`${semiBoldTxCen} w-32 flex-auto`}>
          0 <br /> FOLLOWERS
        </div>
        <div className={`${semiBoldTxCen} w-32 flex-auto `}>
          0 <br /> FOLLOWING
        </div>
      </div>
    );
  };

  return (
    <>
      <ProfileHeader />
      <div className="mt-2 font-semibold">
        {profile.data?.firstName ?? currentUser?.firstName}{" "}
        {profile.data?.lastName ?? currentUser?.lastName}
      </div>
      <div className="font-light italic">
        @{profile.data?.username ?? currentUser?.username}
      </div>
      <div>{profile.data?.about}</div>
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
      <div className="mb-6" />
      <TwoTabs
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
      />
    </>
  );
}
