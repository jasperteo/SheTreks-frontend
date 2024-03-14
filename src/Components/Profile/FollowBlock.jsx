import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { greyButton, ssGreenButton } from "../lib/ClassesName";
import { BACKEND_URL, postRequest, deleteRequest } from "../lib/Constants.js";

export default function FollowBlock({ followers, following }) {
  const currentUser = useOutletContext();

  return (
    <>
      {followers?.data?.rows?.map((follower) => (
        <Follower
          key={follower.id}
          follower={follower}
          currentUser={currentUser}
        />
      ))}
      {following?.data?.rows?.map((followin) => (
        <Followin
          key={followin.id}
          followin={followin}
          currentUser={currentUser}
        />
      ))}
    </>
  );
}

const Follower = ({ follower, currentUser }) => {
  const [followButton, setFollowButton] = useState(false);
  const params = useParams();

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
    <div key={follower.id} className="flex">
      <Link
        className="flex w-3/4 items-start justify-between gap-2"
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
          <div className="whitespace-nowrap text-lg font-semibold text-neutral">
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
          className={`${ssGreenButton} w-1/4`}
        >
          Follow
        </button>
      ) : (
        <button
          onClick={() => unfollowUser(follower?.user?.id)}
          className={`${greyButton}  w-1/4`}
        >
          Remove
        </button>
      )}
    </div>
  );
};

const Followin = ({ followin, currentUser }) => {
  const [followButton, setFollowButton] = useState(false);
  const params = useParams();

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
    <div key={followin.id} className="flex">
      <Link
        className="flex w-3/4 items-start justify-between gap-2"
        to={
          currentUser?.username === followin?.toFollow?.username
            ? `/profile`
            : `/profile/${followin?.toFollow?.username}`
        }
      >
        <img
          loading="lazy"
          src={followin?.toFollow?.imageUrl}
          className="mt-3 aspect-[1.06] w-12 rounded-full"
        />
        <div className=" mr-10 mt-3 flex flex-1 flex-col">
          <div className="whitespace-nowrap text-lg font-semibold text-neutral">
            {followin?.toFollow?.firstName} {followin?.toFollow?.lastName}
          </div>
          <div className="text-sm font-medium text-neutral text-opacity-50">
            @{followin?.toFollow?.username}
          </div>
        </div>
      </Link>
      {params.username ? null : followButton ? (
        <button
          onClick={() => followUser(followin?.toFollow?.id)}
          className={`${ssGreenButton} w-1/4`}
        >
          Follow
        </button>
      ) : (
        <button
          onClick={() => unfollowUser(followin?.toFollow?.id)}
          className={`${greyButton}  w-1/4`}
        >
          Following
        </button>
      )}
    </div>
  );
};
