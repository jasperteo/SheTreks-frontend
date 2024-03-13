import UserSummProfile from "./UserSummProfile";
import { dPinkIcon, darkPinkButton } from "../lib/ClassesName";
import {
  categoryIcon,
  BACKEND_URL,
  postRequest,
  formatDateMaskedTime,
} from "../lib/Constants";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import IndividualMap from "./Map";
import { useOutletContext } from "react-router-dom";

export default function ActivityCard({ activity }) {
  const currentUser = useOutletContext();
  const [requestSent, setRequestSent] = useState(false);

  const { mutate: notifyHost } = useMutation({
    mutationFn: (notifData) =>
      postRequest(`${BACKEND_URL}/users/notifications`, notifData),
  });

  const { mutate: requestToJoin } = useMutation({
    mutationFn: () =>
      postRequest(`${BACKEND_URL}/activities/${activity.id}/participants`, {
        userId: currentUser.id,
      }),
    onSuccess: () => {
      notifyHost({
        recipientId: activity?.hostId,
        senderId: currentUser?.id,
        notifMessage: `${currentUser?.firstName} ${currentUser?.lastName} (@${currentUser?.username}) has requested to join your event, ${activity.title}.`,
      });
      setRequestSent(true);
    },
  });

  return (
    <div className="lg:card-sides card mt-8 bg-primary shadow-xl">
      <div className="card-body">
        <div className="flex">
          {/* <div className="flex-none">
              <RoundedAvatar image={accOwnerImage} size="8" />
            </div> */}
          {/* to indicidate if user is an attendee */}
          {/* <div className="ml-2 mt-1 flex-auto font-light italic">
              {accOwnerUserName} {accOwnerStatus}
            </div> */}
        </div>
        <div className="font-semibold">
          {activity?.location?.country}, {activity?.location?.city}
        </div>
        <div className="font-semibold">{activity?.title}</div>
        <div className="font-light italic">
          {formatDateMaskedTime(activity?.eventDate)}
          {/* {time} */}
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

        <div className="font-semibold">Organiser:</div>
        <UserSummProfile user={activity} />
      </div>
      {activity?.imageUrl && (
        <img
          className="mt-2 object-none"
          src={activity.imageUrl}
          alt="Activity Image"
        />
      )}
      <IndividualMap activity={activity} />

      {/* do not show the join now button if user is an attendee */}
      <div className="card-body -mb-4">
        {requestSent ? (
          <h4 className="text-center">Request sent!</h4>
        ) : (
          <button
            className={`${darkPinkButton} mb-4 text-grey`}
            onClick={requestToJoin}
          >
            JOIN NOW
          </button>
        )}
      </div>
    </div>
  );
}
