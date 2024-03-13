import { Link } from "react-router-dom";
import UserSummProfile from "../../UiComponents/UserSummProfile";
import PopUpConfirmation from "../../UiComponents/PopUpConfirmation";
import { chatIcon, brGreenButton } from "../../lib/ClassesName";
import RoundedAvatar from "../../UiComponents/RoundedAvatar";
import { useContext, useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  BACKEND_URL,
  CurrentUserContext,
  formatDateandTime,
  getRequest,
  deleteRequest,
  postRequest,
} from "../../lib/Constants";
import IndividualMap from "../../UiComponents/Map";

export default function UpcomingJoinedActCard() {
  const currentUser = useContext(CurrentUserContext);
  const [participantId, setParticipantId] = useState(null);
  const [notifData, setNotifData] = useState({});
  const queryClient = useQueryClient();

  //Gets users's upcoming joined events upon page load
  const upcomingJoinedActivity = useQuery({
    queryKey: [
      "upcomingJoinedActs",
      `${BACKEND_URL}/activities/joinedByHost/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/joinedByUser/${currentUser?.id}`),
    enabled: !!currentUser, // i have to wait for all depencies to load. so if i depends on 2 "data", i need to include !!a.id && b.id (it must be in boolean)
  });

  //Posts requests for notification triggered when user withdraws from event
  const { mutate: withdrawNotification } = useMutation({
    mutationFn: (notifData) =>
      postRequest(`${BACKEND_URL}/users/notifications`, notifData),
  });

  //Delete request to remove user from specific activity
  const { mutate } = useMutation({
    mutationFn: () =>
      deleteRequest(`${BACKEND_URL}/activities/participants/${participantId}`),
    onSuccess: () => {
      withdrawNotification(notifData);
      queryClient.invalidateQueries([
        "upcomingJoinedActs",
        `${BACKEND_URL}/activities/joinedByHost/${currentUser?.id}`,
      ]);
    },
  });

  const handleWithdrawEvent = (activity) => {
    // console.log("activity", activity);
    // Find the participant whose userId matches currentUserId
    const data = activity.participants.find(
      (participant) => participant.userId === currentUser?.id,
    );
    console.log("Participant ID:", data);

    setParticipantId(data.id);
    setNotifData({
      recipientId: activity.hostId,
      senderId: currentUser?.id,
      notifMessage: `${currentUser?.firstName} ${currentUser?.lastName} (@${currentUser?.username}) has withdrawn from your event, ${activity.title}.`,
    });

    mutate();
  };

  return (
    <>
      <>
        {upcomingJoinedActivity?.data?.map((activity) => (
          <div
            key={activity.id}
            className="lg:card-sides card mt-8 bg-grey shadow-xl"
          >
            <div className="card-body">
              <div className="flex">
                <div className="flex-none">
                  <RoundedAvatar image={activity?.user?.imageUrl} size="8" />
                </div>
                <div className="ml-2 mt-1 flex-auto font-light italic">
                  {`@${activity?.user?.username}`}
                </div>
                {/* to change URL link */}
                <Link to="/">
                  <iconify-icon
                    icon={chatIcon}
                    class="mr-2 text-3xl text-secondary"
                  />
                </Link>
                <Link to="/">
                  <iconify-icon
                    icon="ri:calendar-check-line"
                    class="mr-2 text-3xl text-success"
                  />
                </Link>
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
              <div className="font-semibold">Participants:</div>
              {activity?.participants?.map((participant) => (
                <UserSummProfile key={participant?.id} user={participant} />
              ))}
              <img
                className="-mt-2 object-none"
                src={activity?.imageUrl}
                alt="Activity Image"
              />
              <IndividualMap activity={activity} />
            </div>

            <PopUpConfirmation
              id={`withdraw-event${activity.id}`}
              option="Withdraw from"
              title={activity?.title}
              message="By agreeing, we will withdraw you from the event."
              onConfirm={() => handleWithdrawEvent(activity)}
            />
          </div>
        ))}
      </>
    </>
  );
}
