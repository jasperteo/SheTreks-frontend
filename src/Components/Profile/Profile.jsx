import { Link } from "react-router-dom";
import ActivityCard from "../ActivityCard";
import RequestCard from "../RequestCard";
import { pinkButton, semiBoldTxCen } from "../lib/Styles";
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
