import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { greyButton, ssGreenButton } from "../lib/ClassesName";
import { BACKEND_URL, postRequest, deleteRequest } from "../lib/Constants.js";
import PopUpConfirmation from "../UiComponents/PopUpConfirmation";

export default function FollowBlock({ follow, remove }) {
  const currentUser = useOutletContext();
  const params = useParams();
  const queryClient = useQueryClient();
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
    onSuccess: (res) => {
      notifytoFollow({
        recipientId: res.data.toFollowId,
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

  const { mutate: removeFollower } = useMutation({
    mutationFn: (toFollowId) =>
      deleteRequest(
        `${BACKEND_URL}/users/unfollow/${toFollowId}/${currentUser?.id}`,
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [
          "followers",
          `${BACKEND_URL}/users/followers/${currentUser?.id}`,
        ],
      }),
  });

  return (
    <>
      <div className="flex">
        <Link
          className="flex w-3/4 items-start justify-between gap-2"
          to={
            currentUser?.username === follow?.user?.username ||
            currentUser?.username === follow?.toFollow?.username
              ? `/profile`
              : `/profile/${follow?.user?.username || follow?.toFollow?.username}`
          }
        >
          <img
            loading="lazy"
            src={follow?.user?.imageUrl || follow?.toFollow?.imageUrl}
            className="mt-3 aspect-[1.06] w-12 rounded-full"
          />
          <div className=" mr-10 mt-3 flex flex-1 flex-col">
            <div className="whitespace-nowrap text-lg font-semibold text-neutral">
              {follow?.user?.firstName || follow?.toFollow?.firstName}{" "}
              {follow?.user?.lastName || follow?.toFollow?.lastName}
            </div>
            <div className="text-sm font-medium text-neutral text-opacity-50">
              @{follow?.user?.username || follow?.toFollow?.username}
            </div>
          </div>
        </Link>
        {params.username ? null : remove ? (
          <button
            onClick={() =>
              document
                .getElementById(`remove-follower${follow?.user?.id}`)
                .showModal()
            }
            className={`${greyButton}  w-1/4`}
          >
            Remove
          </button>
        ) : followButton ? (
          <button
            onClick={() => followUser(follow?.toFollow?.id)}
            className={`${ssGreenButton} w-1/4`}
          >
            Follow
          </button>
        ) : (
          <button
            onClick={() => unfollowUser(follow?.toFollow?.id)}
            className={`${greyButton}  w-1/4`}
          >
            Following
          </button>
        )}
      </div>
      <PopUpConfirmation
        id={`remove-follower${follow?.user?.id}`}
        option="Remove"
        title={`${follow?.user?.username} as a follower`}
        message="Are you sure you want to remove this user as a follower?"
        onConfirm={() => removeFollower(follow?.user?.id)}
      />
    </>
  );
}
