import { Link } from "react-router-dom";
import ActivityCard from "../UiComponents/ActivityCard";
import { pinkButton, semiBoldTxCen } from "../lib/ClassesName";
import TwoTabs from "../UiComponents/TwoTabs.jsx";
import SocialActivityCard from "../UiComponents/SocialActivityCard.jsx";
import { UserButton } from "@clerk/clerk-react";
import { CurrentUserContext, getRequest, BACKEND_URL } from "../lib/Constants";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const currentUser = useContext(CurrentUserContext);

  const followers = useQuery({
    queryKey: [
      "followers",
      `${BACKEND_URL}/users/followers/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/followers/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  const following = useQuery({
    queryKey: [
      "following",
      `${BACKEND_URL}/users/following/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/following/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  const pastActivities = useQuery({
    queryKey: [
      "pastActivities",
      `${BACKEND_URL}/activities/past/${currentUser?.id}/`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/past/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  // console.log(pastActivities.data);

  const currentActivities = useQuery({
    queryKey: [
      "pastActivities",
      `${BACKEND_URL}/activities/current/${currentUser?.id}/`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/current/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  // console.log(currentActivities.data);
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
              {followers?.data?.count}
              <br />
              FOLLOWERS
            </div>
            <div className={`${semiBoldTxCen} w-1/2  `}>
              {following?.data?.count}
              <br />
              FOLLOWING
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
      <TwoTabs
        leftTitle="CURRENT"
        rightTitle="PAST"
        leftContent={
          <SocialActivityCard
            colour="primary"
            user={currentUser}
            activities={currentActivities.data}
          />
        }
        rightContent={
          <SocialActivityCard
            colour="grey"
            user={currentUser}
            activities={pastActivities.data}
          />
        }
      />
    </>
  );
}
