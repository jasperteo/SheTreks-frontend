import { UserButton } from "@clerk/clerk-react";
import { Link, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { pinkButton, semiBoldTxCen } from "../lib/ClassesName";
import { getRequest, BACKEND_URL } from "../lib/Constants";
import SocialActivityCard from "../UiComponents/SocialActivityCard.jsx";
import TwoTabs from "../UiComponents/TwoTabs.jsx";

export default function Profile() {
  const currentUser = useOutletContext();

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

  const currentActivities = useQuery({
    queryKey: [
      "currentActivities",
      `${BACKEND_URL}/activities/current/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/current/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  return (
    <>
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
      <div className="mt-2 font-semibold">
        {currentUser?.firstName} {currentUser?.lastName}
      </div>
      <div className="font-light italic">@{currentUser?.username}</div>
      <div>
        {!!currentUser?.location &&
          `📍 ${currentUser?.location?.city}, ${currentUser?.location?.country}`}
      </div>
      <div>{currentUser?.about}</div>
      <div className="flex justify-start">
        <Link to="/profile/setting">
          <button className={`${pinkButton} mr-4 mt-2`}>Edit Bio</button>
        </Link>
        <Link to="/activity/add">
          <button className={`${pinkButton} mt-2`}>Add Activity</button>
        </Link>
      </div>
      <div className="mb-6" />
      <TwoTabs
        leftTitle="CURRENT"
        rightTitle="PAST"
        leftContent={currentActivities?.data?.map((activity) => (
          <SocialActivityCard
            key={activity.id}
            colour="primary"
            user={currentUser}
            activity={activity}
          />
        ))}
        rightContent={pastActivities?.data?.map((activity) => (
          <SocialActivityCard
            key={activity.id}
            colour="grey"
            user={currentUser}
            activity={activity}
          />
        ))}
      />
    </>
  );
}
