import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { greyButton, brGreenButton } from "../lib/ClassesName";
import { BACKEND_URL, postRequest, deleteRequest } from "../lib/Constants.js";

export default function FollowBlock({ followers, following }) {
  const currentUser = useOutletContext();
  const params = useParams();

  const Follower = (follower) => {
    const [followButton, setFollowButton] = useState(false);

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
          recipientId: follower?.user?.id,
          senderId: currentUser?.id,
          notifMessage: `${currentUser?.firstName} ${currentUser?.lastName} (@${currentUser?.username}) has followed you.`,
        });
        setFollowButton(false);
      },
    });

    const { mutate: unfollowUser } = useMutation({
      mutationFn: (toFollowId) =>
        deleteRequest(
          `${BACKEND_URL}/users/unfollow/${currentUser?.id}/${toFollowId}`,
        ),
      onSuccess: () => setFollowButton(true),
    });

    return (
      <div key={follower.id} className="flex items-start justify-between gap-2">
        <Link
          to={
            currentUser?.username === follower?.user?.username
              ? `/profile`
              : `/profile/${follower?.user?.username}`
          }
        >
          <img
            loading="lazy"
            src={follower?.user?.imageUrl}
            className="mt-3 aspect-[1.06] w-12 rounded-full"
          />
          <div className=" mr-10 mt-3 flex flex-1 flex-col">
            <div className="whitespace-nowrap text-lg font-bold text-neutral">
              {follower?.user?.firstName} {follower?.user?.lastName}
            </div>
            <div className="text-sm font-medium text-neutral text-opacity-50">
              @{follower?.user?.username}
            </div>
          </div>
        </Link>

        {params.username ? null : followButton ? (
          <button
            onClick={() => followUser(follower?.user?.id)}
            className={brGreenButton}
          >
            Follow
          </button>
        ) : (
          <button
            onClick={() => unfollowUser(follower?.user?.id)}
            className={greyButton}
          >
            Remove
          </button>
        )}
      </div>
    );
  };

  const Follow = (follow) => {
    const [followButton, setFollowButton] = useState(false);

    const { mutate: followUser } = useMutation({
      mutationFn: (toFollowId) =>
        postRequest(
          `${BACKEND_URL}/users/follow/${currentUser?.id}/${toFollowId}`,
        ),
      onSuccess: () => setFollowButton(false),
    });

    const { mutate: unfollowUser } = useMutation({
      mutationFn: (toFollowId) =>
        deleteRequest(
          `${BACKEND_URL}/users/unfollow/${currentUser?.id}/${toFollowId}`,
        ),
      onSuccess: () => setFollowButton(true),
    });

    return (
      <div key={follow.id} className="flex items-start justify-between gap-2">
        <Link
          to={
            currentUser?.username === follow?.toFollow?.username
              ? `/profile`
              : `/profile/${follow?.toFollow?.username}`
          }
        >
          <img
            loading="lazy"
            src={follow?.toFollow?.imageUrl}
            className="mt-3 aspect-[1.06] w-12 rounded-full"
          />
        </Link>
        <div className=" mr-10 mt-3 flex flex-1 flex-col">
          <div className="whitespace-nowrap text-lg font-bold text-black">
            {follow?.toFollow?.firstName} {follow?.toFollow?.lastName}
          </div>
          <div className="text-sm font-medium text-black text-opacity-50">
            @{follow?.toFollow?.username}
          </div>
        </div>
        {params.username ? null : followButton ? (
          <button
            onClick={() => followUser(follow?.toFollow?.id)}
            className={brGreenButton}
          >
            Follow
          </button>
        ) : (
          <button
            onClick={() => unfollowUser(follow?.toFollow?.id)}
            className={greyButton}
          >
            Following
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {followers?.data?.rows?.map((follower) => (
        <Follower key={follower.id} {...follower} />
      ))}
      {following?.data?.rows?.map((follow) => (
        <Follow key={follow.id} {...follow} />
      ))}
    </>
  );
}
