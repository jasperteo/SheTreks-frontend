import { Link, useOutletContext } from "react-router-dom";
import UserSummProfile from "../../UiComponents/UserSummProfile";
import PopUpConfirmation from "../../UiComponents/PopUpConfirmation";
import RoundedAvatar from "../../UiComponents/RoundedAvatar";
import { darkPinkButton } from "../../lib/ClassesName";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  BACKEND_URL,
  formatDateandTime,
  getRequest,
  deleteRequest,
} from "../../lib/Constants";
import IndividualMap from "../../UiComponents/Map";

export default function UpcomingOrgActCard() {
  const currentUser = useOutletContext();
  const queryClient = useQueryClient();

  const upcomingOrgActivity = useQuery({
    queryKey: [
      "upcomingOrgActs",
      `${BACKEND_URL}/activities/includeHost/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/includeHost/${currentUser?.id}`),
    enabled: !!currentUser, // i have to wait for all depencies to load. so if i depends on 2 "data", i need to include !!a.id && b.id (it must be in boolean)
  });

  const { mutate } = useMutation({
    mutationKey: "deleteEvent",
    mutationFn: (activity) =>
      deleteRequest(`${BACKEND_URL}/activities/delete/${activity.id}`),
    onSuccess: () =>
      queryClient.invalidateQueries([
        "upcomingOrgActs",
        `${BACKEND_URL}/activities/includeHost/${currentUser?.id}`,
      ]),
  });

  const handleDeleteEvent = (activity) => {
    console.log("Event deleted!", activity);
    mutate(activity);
    document.getElementById(`delete-event-${activity.id}`).close();
  };

  return (
    <>
      {upcomingOrgActivity?.data?.map((activity) => (
        <div
          key={activity.id}
          className="lg:card-sides card mt-8 bg-primary shadow-xl"
        >
          <div className="card-body">
            <div className="flex">
              <div className="flex-none">
                <RoundedAvatar image={`${currentUser?.imageUrl}`} size="8" />
              </div>
              <div className="ml-2 mt-1 flex-auto font-light italic">
                @{currentUser?.username}
              </div>
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
                    .getElementById(`delete-event-${activity.id}`)
                    .showModal()
                }
              />
            </div>
            <div className="font-semibold">
              {activity?.location.city}, {activity?.location.country}
            </div>
            <div className="font-semibold">{activity?.title}</div>
            <div>{formatDateandTime(activity?.eventDate)}</div>
            <div>{activity?.description}</div>
            <div>{activity?.address}</div>
            <div>Estimated Group Size: {activity?.group_size?.size}</div>
            {/* list of confirmed participants */}

            {activity?.participants.some(
              (participant) => participant?.status,
            ) && <div className="font-semibold">Participants:</div>}
            {activity?.participants.map(
              (participant) =>
                participant?.status && (
                  <UserSummProfile key={participant?.id} user={participant} />
                ),
            )}

            {activity?.participants.some(
              (participant) => !participant?.status,
            ) && <div className="font-semibold">Pending Confirmation:</div>}
            {activity?.participants.map(
              (participant) =>
                !participant?.status && (
                  <UserSummProfile key={participant?.id} user={participant} />
                ),
            )}
            <img
              className="-mt-2 object-cover"
              src={activity?.imageUrl}
              alt="Activity Image"
            />
            <IndividualMap activity={activity} />
            {activity.participants.some(
              (participant) => !participant.status,
            ) && (
              <Link to={`/activity/${activity.id}`}>
                <button
                  className={`${darkPinkButton} mb-2 mt-2 size-full text-grey`}
                >
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
            onConfirm={handleDeleteEvent}
          />
        </div>
      ))}
      {/* pop up modal */}
    </>
  );
}
