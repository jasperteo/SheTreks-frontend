import { Link, useParams } from "react-router-dom";
import { pinkButton, semiBoldTxCen } from "../lib/ClassesName";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL, getRequest } from "../lib/Constants";
import TwoTabs from "../UiComponents/TwoTabs";
import SocialActivityCard from "../UiComponents/SocialActivityCard";
import RoundedAvatar from "../UiComponents/RoundedAvatar";

export default function ProfileOther() {
  const params = useParams();
  // console.log(params.username);

  //fetch user data
  const userInfo = useQuery({
    queryKey: ["userInfo", `${BACKEND_URL}/users/profile/${params.username}`],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/profile/${params.username}`),
  });

  // console.log(userInfo.data);

  const ProfileHeader = () => {
    return (
      <div className="flex items-center">
        <div className="avatar w-24 flex-none">
          <div className="rounded-full">
            <RoundedAvatar image={userInfo?.data?.imageUrl} size="16" />
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

  const pastActivities = useQuery({
    queryKey: [
      "pastActivities",
      `${BACKEND_URL}/activities/past/${userInfo?.data?.id}/`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/past/${userInfo?.data?.id}`),
    enabled: !!userInfo?.data?.id,
  });

  // console.log(pastActivities.data);

  const currentActivities = useQuery({
    queryKey: [
      "currentActivities",
      `${BACKEND_URL}/activities/current/${userInfo?.data?.id}/`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/current/${userInfo?.data?.id}`),
    enabled: !!userInfo?.data?.id,
  });

  // console.log(currentActivities.data);

  return (
    <>
      <ProfileHeader />
      <div className="mt-2 font-semibold">
        {userInfo?.data?.firstName} {userInfo?.data?.lastName}
      </div>
      <div className="font-light italic">@{userInfo?.data?.username}</div>
      <div>{userInfo?.data?.about}</div>
      <div className="flex justify-start">
        <Link to="/profile/setting">
          {/* view for non-account holder - button to show Follow or Following */}
          <button className={`${pinkButton} mr-4 mt-2`}>Follow</button>
        </Link>
      </div>
      <div className="mb-6" />
      <TwoTabs
        leftTitle="CURRENT"
        rightTitle="PAST"
        leftContent={
          <SocialActivityCard
            colour="primary"
            user={userInfo.data}
            activities={currentActivities.data}
          />
        }
        rightContent={
          <SocialActivityCard
            colour="grey"
            user={userInfo.data}
            activities={pastActivities.data}
          />
        }
      />
    </>
  );
}
