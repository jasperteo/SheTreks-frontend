import { Link, useParams, useOutletContext } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pinkButton, semiBoldTxCen } from "../lib/ClassesName";
import {
  BACKEND_URL,
  getRequest,
  postRequest,
  deleteRequest,
} from "../lib/Constants";
import RoundedAvatar from "../UiComponents/RoundedAvatar";
import SocialActivityCard from "../UiComponents/SocialActivityCard";
import TwoTabs from "../UiComponents/TwoTabs";

export default function ProfileOther() {
  const currentUser = useOutletContext();
  const params = useParams();
  const queryClient = useQueryClient();

  const userInfo = useQuery({
    queryKey: ["userInfo", `${BACKEND_URL}/users/profile/${params.username}`],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/profile/${params.username}`),
  });

  const followers = useQuery({
    queryKey: [
      "followers",
      `${BACKEND_URL}/users/followers/${userInfo?.data?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/followers/${userInfo?.data?.id}`),
    enabled: !!userInfo.data,
  });

  const following = useQuery({
    queryKey: [
      "following",
      `${BACKEND_URL}/users/following/${userInfo?.data?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/following/${userInfo?.data?.id}`),
    enabled: !!userInfo.data,
  });

  const currentUserFollowing = useQuery({
    queryKey: [
      "currentUserFollowing",
      `${BACKEND_URL}/users/following/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/following/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  const pastActivities = useQuery({
    queryKey: [
      "pastActivities",
      `${BACKEND_URL}/activities/past/${userInfo?.data?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/past/${userInfo?.data?.id}`),
    enabled: !!userInfo.data,
  });

  const currentActivities = useQuery({
    queryKey: [
      "currentActivities",
      `${BACKEND_URL}/activities/current/${userInfo?.data?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/current/${userInfo?.data?.id}`),
    enabled: !!userInfo.data,
  });

  const { mutate: notifytoFollow } = useMutation({
    mutationFn: (notifData) =>
      postRequest(`${BACKEND_URL}/users/notifications`, notifData),
  });

  const { mutate: followUser } = useMutation({
    mutationFn: (toFollowId) =>
      postRequest(
        `${BACKEND_URL}/users/follow/${currentUser?.id}/${toFollowId}`,
      ),
    onSuccess: () => {
      notifytoFollow({
        recipientId: userInfo?.data?.id,
        senderId: currentUser?.id,
        notifMessage: `${currentUser?.firstName} ${currentUser?.lastName} (@${currentUser?.username}) has followed you.`,
      });
      queryClient.invalidateQueries({
        queryKey: [
          "currentUserFollowing",
          `${BACKEND_URL}/users/following/${currentUser?.id}`,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "followers",
          `${BACKEND_URL}/users/followers/${userInfo?.data?.id}`,
        ],
      });
    },
  });

  const { mutate: unfollowUser } = useMutation({
    mutationFn: (toFollowId) =>
      deleteRequest(
        `${BACKEND_URL}/users/unfollow/${currentUser?.id}/${toFollowId}`,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "currentUserFollowing",
          `${BACKEND_URL}/users/following/${currentUser?.id}`,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "followers",
          `${BACKEND_URL}/users/followers/${userInfo?.data?.id}`,
        ],
      });
    },
  });

  return (
    <>
      <Link to={-1}>
        <iconify-icon class="text-3xl" icon="ri:arrow-left-s-line" />
      </Link>
      <div className="flex items-center">
        <div className="avatar w-24 flex-none">
          <div className="rounded-full">
            <RoundedAvatar image={userInfo?.data?.imageUrl} size="16" />
          </div>
        </div>
        <Link to={`/profile/${params.username}/follow`} className="flex-auto">
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
        {userInfo?.data?.firstName} {userInfo?.data?.lastName}
      </div>
      <div className="font-light italic">@{userInfo?.data?.username}</div>
      <div>
        {!!userInfo?.data?.location &&
          `📍 ${userInfo?.data?.location?.city}, ${userInfo?.data?.location?.country}`}
      </div>
      <div>{userInfo?.data?.about}</div>
      <div className="flex justify-start">
        <div>
          {currentUserFollowing?.data?.rows?.some(
            (user) => user.toFollow.id === userInfo?.data?.id,
          ) ? (
            <button
              onClick={() => unfollowUser(userInfo?.data?.id)}
              className={`${pinkButton} mr-4 mt-2`}
            >
              Following
            </button>
          ) : (
            <button
              onClick={() => followUser(userInfo?.data?.id)}
              className={`${pinkButton} mr-4 mt-2`}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="mb-6" />
      <TwoTabs
        leftTitle="CURRENT"
        rightTitle="PAST"
        leftContent={currentActivities?.data?.map((activity) => (
          <SocialActivityCard
            key={activity.id}
            colour="primary"
            user={userInfo?.data}
            activity={activity}
          />
        ))}
        rightContent={pastActivities?.data?.map((activity) => (
          <SocialActivityCard
            key={activity.id}
            colour="grey"
            user={userInfo?.data}
            activity={activity}
          />
        ))}
      />
    </>
  );
}
