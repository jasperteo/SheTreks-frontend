import "add-to-calendar-button";
import dayjs from "dayjs";
import { Link, useOutletContext } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { darkPinkButton } from "../../lib/ClassesName";
import {
  BACKEND_URL,
  formatDateandTime,
  deleteRequest,
  postRequest,
} from "../../lib/Constants";
import IndividualMap from "../../UiComponents/Map";
import PopUpConfirmation from "../../UiComponents/PopUpConfirmation";
import RoundedAvatar from "../../UiComponents/RoundedAvatar";
import UserSummProfile from "../../UiComponents/UserSummProfile";

export default function UpcomingOrgActCard({ activity }) {
  const currentUser = useOutletContext();
  const queryClient = useQueryClient();

  const { mutate: notifyParticipants } = useMutation({
    mutationFn: (notifData) =>
      postRequest(`${BACKEND_URL}/users/notifications`, notifData),
  });

  const { mutate: deleteActivity } = useMutation({
    mutationFn: () =>
      deleteRequest(`${BACKEND_URL}/activities/delete/${activity.id}`),
    onSuccess: () => {
      activity.participants.map((participant) =>
        notifyParticipants({
          recipientId: participant?.userId,
          senderId: currentUser?.id,
          notifMessage: `${currentUser?.firstName} ${currentUser?.lastName} (@${currentUser?.username}) has cancelled the event, ${activity.title}.`,
        }),
      );
      queryClient.invalidateQueries([
        "upcomingOrgActs",
        `${BACKEND_URL}/activities/includeHost/${currentUser?.id}`,
      ]);
    },
  });

  return (
    <div className="lg:card-sides card mt-8 bg-primary shadow-xl">
      <div className="card-body">
        <div className="flex">
          <div className="flex-none">
            <RoundedAvatar image={`${currentUser?.imageUrl}`} size="8" />
          </div>
          <div className="ml-2 mt-1 flex-auto font-light italic">
            @{currentUser?.username}
          </div>
          <div className="-mt-3 mr-1">
            <add-to-calendar-button
              name={activity?.title}
              startDate={dayjs(activity?.eventDate).format("YYYY-MM-DD")}
              startTime={dayjs(activity?.eventDate).format("HH:mm")}
              endTime="23:59"
              options="'Apple', 'Google', 'Outlook.com'"
              hideTextLabelButton
              buttonStyle="round"
              styleLight="--btn-background: #F8DCD8;"
            />
          </div>
          <iconify-icon
            icon="ri:delete-bin-line"
            class="text-3xl text-neutral"
            onClick={() =>
              document.getElementById(`delete-event-${activity.id}`).showModal()
            }
          />
        </div>
        <div className="font-semibold">
          {activity?.location?.city}, {activity?.location?.country}
        </div>
        <div className="font-semibold">{activity?.title}</div>
        <div>{formatDateandTime(activity?.eventDate)}</div>
        <div>{activity?.description}</div>
        <div>{activity?.address}</div>
        <div>Estimated Group Size: {activity?.group_size?.size}</div>
        <div>Estimated Cost: ${activity?.cost}</div>
        {activity?.participants.some((participant) => participant?.status) && (
          <div className="font-semibold">Participants:</div>
        )}
        {activity?.participants.map(
          (participant) =>
            participant?.status && (
              <Link
                to={
                  currentUser?.username === participant?.user?.username
                    ? `/profile`
                    : `/profile/${participant?.user?.username}`
                }
                key={participant?.id}
              >
                <UserSummProfile user={participant} />
              </Link>
            ),
        )}

        {activity?.participants.some((participant) => !participant?.status) && (
          <div className="font-semibold">Pending Confirmation:</div>
        )}
        {activity?.participants.map(
          (participant) =>
            !participant?.status && (
              <Link
                to={
                  currentUser?.username === participant?.user?.username
                    ? `/profile`
                    : `/profile/${participant?.user?.username}`
                }
                key={participant?.id}
              >
                <UserSummProfile user={participant} />
              </Link>
            ),
        )}
        {!!activity?.imageUrl && (
          <img
            className="object-cover"
            src={activity?.imageUrl}
            alt="Activity Image"
          />
        )}
        <IndividualMap activity={activity} />
        {activity.participants.some((participant) => !participant.status) && (
          <Link to={`/activity/${activity.id}`}>
            <button className={`${darkPinkButton} mt-5 size-full text-grey`}>
              VIEW REQUEST
            </button>
          </Link>
        )}
      </div>
      <PopUpConfirmation
        id={`delete-event-${activity.id}`}
        option="Delete"
        title={activity.title}
        message="By agreeing, the event will be permanently deleted."
        onConfirm={deleteActivity}
      />
    </div>
  );
}
