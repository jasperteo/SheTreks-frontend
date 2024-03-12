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
} from "../../lib/Constants";
import IndividualMap from "../../UiComponents/Map";

export default function UpcomingJoinedActCard() {
  const currentUser = useContext(CurrentUserContext);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [participantId, setParticipantId] = useState(null);
  const queryClient = useQueryClient();

  // console.log("user", currentUser);

  const upcomingJoinedActivity = useQuery({
    queryKey: [
      "upcomingJoinedActs",
      `${BACKEND_URL}/activities/joinedByHost/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/joinedByUser/${currentUser?.id}`),
    enabled: !!currentUser?.id, // i have to wait for all depencies to load. so if i depends on 2 "data", i need to include !!a.id && b.id (it must be in boolean)
  });

  // console.log(upcomingJoinedActivity.data);

  const { mutate } = useMutation({
    mutationKey: "withdrawEvent",
    mutationFn: (id) =>
      deleteRequest(`${BACKEND_URL}/activities/participants/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries([
        "upcomingJoinedActs",
        `${BACKEND_URL}/activities/joinedByHost/${currentUser?.id}`,
      ]),
  });

  const handleWithdrawEvent = (activity) => {
    console.log("activity", activity);
    // Find the participant whose userId matches currentUserId
    const { id } = activity.participants.find(
      (participant) => participant.userId === currentUser?.id,
    );
    console.log("Participant ID:", activity);
    setParticipantId(id);

    mutate(id);
  };

  return (
    <>
      <IndividualMap activity={activity} />
      {upcomingJoinedActivity.data &&
        upcomingJoinedActivity.data.map((activity) => (
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
                      .getElementById(`withdraw-event-${activity.id}`)
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
            </div>
            <PopUpConfirmation
              id={`withdraw-event-${activity.id}`}
              option="Withdraw"
              title={activity.title}
              message="By agreeing, we will withdraw you from the event."
              onConfirm={() => handleWithdrawEvent(activity)}
            />
          </div>
        ))}
    </>
  );
}
