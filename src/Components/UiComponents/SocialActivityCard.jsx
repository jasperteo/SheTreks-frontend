import { useOutletContext } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dPinkIcon, darkPinkButton } from "../lib/ClassesName";
import {
  BACKEND_URL,
  categoryIcon,
  formatDateMaskedTime,
  formatDateandTime,
  postRequest,
} from "../lib/Constants";
import IndividualMap from "./Map";
import RoundedAvatar from "./RoundedAvatar";
import UserSummProfile from "./UserSummProfile";

export default function SocialActivityCard({ colour, activities, user }) {
  const currentUser = useOutletContext();
  const queryClient = useQueryClient();

  const { mutate: notifyHost } = useMutation({
    mutationFn: (data) =>
      postRequest(`${BACKEND_URL}/users/notifications`, data),
  });

  const Activity = (activity) => {
    const { mutate: joinActivity } = useMutation({
      mutationFn: () =>
        postRequest(`${BACKEND_URL}/activities/${activity.id}/participants`, {
          userId: currentUser?.id,
        }),
      onSuccess: () => {
        notifyHost({
          recipientId: activity.hostId,
          senderId: currentUser?.id,
          notifMessage: `${currentUser?.username} would like to join "${activity.title}"`,
        });
        queryClient.invalidateQueries({
          queryKey: [
            "currentActivities",
            `${BACKEND_URL}/activities/current/${user?.id}/`,
          ],
        });
      },
    });

    return (
      <div
        className={`lg:card-sides card mt-8 bg-${colour} shadow-xl`}
        key={activity.id}
      >
        <div className="card-body">
          <div className="flex">
            <div className="flex-none">
              <RoundedAvatar image={user?.imageUrl} size="8" />
            </div>
            <div className="ml-2 mt-1 flex-auto font-light italic">
              {`@${user?.username}`}
              {activity?.hostId !== user?.id ? " (Attendee)" : " (Organiser)"}
            </div>
          </div>
          <div className="font-semibold">
            {activity?.location?.city}, {activity?.location?.country}
          </div>

          <div className="font-semibold">{activity?.title}</div>

          <div className="font-light italic">
            {new Date(activity?.eventDate) < new Date()
              ? formatDateandTime(activity?.eventDate)
              : activity?.participants?.some(
                    (participant) =>
                      participant?.user.id === currentUser?.id &&
                      participant?.status === true,
                  ) || activity?.hostId === currentUser?.id
                ? formatDateandTime(activity?.eventDate)
                : formatDateMaskedTime(activity?.eventDate)}
          </div>
          <div>{activity?.description}</div>
          <div>Estimated Group Size: {activity?.group_size?.size}</div>
          <div>{activity?.address}</div>
          <div className="items-left flex flex-col flex-wrap space-x-1 ">
            {activity.categories.map((category) => (
              <div className={`${dPinkIcon}`} key={category?.id}>
                <iconify-icon inline icon={`${categoryIcon(category?.id)}`} />
                <p className="text-xs">{category?.categoryName}</p>
              </div>
            ))}
          </div>
          {activity?.hostId !== user?.id && (
            <>
              <div className="font-semibold">Organiser:</div>
              <UserSummProfile user={activity} key={activity?.user?.id} />
            </>
          )}
          {activity?.participants?.some(
            (participant) => !!participant?.status,
          ) && (
            <>
              <div className="font-semibold">Participants:</div>
              {activity?.participants?.map(
                (participant) =>
                  !!participant?.status && (
                    <UserSummProfile user={participant} key={participant?.id} />
                  ),
              )}
            </>
          )}
          <IndividualMap activity={activity} />
          {activity?.hostId !== currentUser?.id &&
            new Date(activity?.eventDate) > new Date() && (
              <div className="card-body -mb-4">
                {activity?.participants?.some(
                  (participant) =>
                    participant?.user.id === currentUser?.id &&
                    !participant?.status,
                ) ? (
                  <button
                    className={`${darkPinkButton} -mb-4 -mt-4 text-grey`}
                    disabled
                  >
                    REQUESTED
                  </button>
                ) : (
                  activity?.participants?.some(
                    (participant) =>
                      participant?.user.id === currentUser?.id &&
                      participant?.status,
                  ) || (
                    <button
                      className={`${darkPinkButton} -mb-4 -mt-4 text-grey`}
                      onClick={joinActivity}
                    >
                      JOIN NOW
                    </button>
                  )
                )}
              </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <>
      {activities?.map((activity) => (
        <Activity key={activity?.id} {...activity} />
      ))}
    </>
  );
}
