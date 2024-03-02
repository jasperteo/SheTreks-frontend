import { Link } from "react-router-dom";
import ActivityCard from "../ActivityCard";
import RequestCard from "../RequestCard";
import { pinkButton, semiBoldTxCen } from "../lib/Styles";
import { useParams } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getRequest, BACKEND_URL } from "../lib/Constants";

export default function Profile({ userData }) {
  const params = useParams();

  const { data: profileData } = useQuery({
    queryKey: [
      "profile",
      userData,
      `${BACKEND_URL}/users/profile/${params.username}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/profile/${params.username}`),
  });

  const ProfileHeader = () => {
    return (
      <div className="flex items-center">
        <div className="avatar w-24 flex-none">
          <div className="rounded-full">
            {params.username === userData?.username ? (
              <UserButton
                appearance={{
                  elements: { avatarBox: "w-24 h-24" },
                }}
              />
            ) : (
              <img src={profileData?.imageUrl} />
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
        {profileData?.firstName} {profileData?.lastName}
      </div>
      <div className="font-light italic">@{profileData?.username}</div>
      <div>{profileData?.about}</div>
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
