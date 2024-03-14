import "add-to-calendar-button";
import dayjs from "dayjs";
import { Link, useOutletContext } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
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

export default function UpcomingJoinedActCard({ activity }) {
  const currentUser = useOutletContext();
  const queryClient = useQueryClient();

  const { mutate: notifyHost } = useMutation({
    mutationFn: (notifData) =>
      postRequest(`${BACKEND_URL}/users/notifications`, notifData),
  });

  const { mutate: withdrawEvent } = useMutation({
    mutationFn: (participantId) =>
      deleteRequest(`${BACKEND_URL}/activities/participants/${participantId}`),
    onSuccess: () => {
      notifyHost({
        recipientId: activity.hostId,
        senderId: currentUser?.id,
        notifMessage: `${currentUser?.firstName} ${currentUser?.lastName} (@${currentUser?.username}) has withdrawn from your event, ${activity.title}.`,
      });
      queryClient.invalidateQueries([
        "upcomingJoinedActs",
        `${BACKEND_URL}/activities/joinedByHost/${currentUser?.id}`,
      ]);
    },
  });

  return (
    <div className="lg:card-sides card mt-8 bg-grey shadow-xl">
      <div className="card-body">
        <div className="flex">
          <div className="flex-none">
            <RoundedAvatar image={activity?.user?.imageUrl} size="8" />
          </div>
          <div className="ml-2 mt-1 flex-auto font-light italic">
            @{activity?.user?.username}
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
              styleLight="--btn-background: #F2F3F4;"
            />
          </div>
          <iconify-icon
            icon="ri:delete-bin-line"
            class="text-3xl text-neutral"
            onClick={() =>
              document
                .getElementById(`withdraw-event${activity.id}`)
                .showModal()
            }
          />
        </div>
        <div className="font-semibold">
          {`${activity?.location?.city}, ${activity?.location?.country}`}
        </div>
        <div className="font-semibold">{activity?.title}</div>
        <div>{formatDateandTime(activity?.eventDate)}</div>
        <div>{activity?.address}</div>
        <div>Estimated Cost: ${activity?.cost}</div>
        <div className="font-semibold">Participants:</div>
        {activity?.participants?.map((participant) => (
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
        ))}
        {!!activity?.imageUrl && (
          <img
            className="object-cover"
            src={activity?.imageUrl}
            alt="Activity Image"
          />
        )}
        <IndividualMap activity={activity} />
      </div>
      <PopUpConfirmation
        id={`withdraw-event${activity.id}`}
        option="Withdraw from"
        title={activity?.title}
        message="By agreeing, we will withdraw you from the event."
        onConfirm={() =>
          withdrawEvent(
            activity.participants.find(
              (participant) => participant.userId === currentUser?.id,
            ).id,
          )
        }
      />
    </div>
  );
}
