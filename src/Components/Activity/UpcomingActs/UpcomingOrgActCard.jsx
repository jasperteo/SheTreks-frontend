import { Link } from "react-router-dom";
import UserSummProfile from "../../UiComponents/UserSummProfile";
import PopUpConfirmation from "../../UiComponents/PopUpConfirmation";
import { RoundedAvatar, chatIcon, darkPinkButton } from "../../lib/ClassesName";
import { useQuery } from "@tanstack/react-query";
import {
  BACKEND_URL,
  CurrentUserContext,
  formatDateandTime,
  getRequest,
} from "../../lib/Constants";
import { useContext } from "react";

export default function UpcomingOrgActCard() {
  const currentUser = useContext(CurrentUserContext);

  const upcomingOrgActivity = useQuery({
    queryKey: [
      "upcomingOrgActs",
      `${BACKEND_URL}/activities/includeHost/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/includeHost/${currentUser?.id}`),
    enabled: !!currentUser?.id, // i have to wait for all depencies to load. so if i depends on 2 "data", i need to include !!a.id && b.id (it must be in boolean)
  });

  // console.log(currentUser);
  // console.log(upcomingOrgActivity.data);

  const handleDeleteEvent = () => {
    console.log("Event deleted!");
    //close modal after clicking "ok"
    const dialog = document.querySelector("#delete-event");
    dialog.close();
  };

  return (
    <>
      {upcomingOrgActivity.data &&
        upcomingOrgActivity.data.map((activity) => (
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
                  {`@${currentUser?.username}`}
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
                    document.getElementById("delete-event").showModal()
                  }
                />
              </div>
              <div className="font-semibold">
                {activity?.location.city}, {activity?.location.country}
              </div>
              <div className="font-semibold">{activity?.title}</div>
              <div>{formatDateandTime(activity?.eventDate)}</div>
              <div>{activity?.address}</div>
              {/* list of confirmed participants */}
              {activity?.participants &&
                activity?.participants.map((participant) =>
                  participant?.status === true ? (
                    <>
                      <div className="font-semibold" key={participant?.user.id}>
                        Participants:
                      </div>
                      <UserSummProfile user={participant} />
                    </>
                  ) : null,
                )}
              {/* if there is no request, do not show view request button. Hit the first "false" status and break. */}
              {activity?.participants && (
                <>
                  {activity.participants.some(
                    (participant) => !participant.status,
                  ) && (
                    <Link to={`../activity/${activity.id}/request`}>
                      <button
                        className={`${darkPinkButton} mb-2 mt-2 size-full text-grey`}
                      >
                        VIEW REQUEST
                      </button>
                    </Link>
                  )}
                </>
              )}
            </div>
            <figure>
              <img src="/map.png" alt="map" />
            </figure>
          </div>
        ))}
      {/* pop up modal */}
      <PopUpConfirmation
        id="delete-event"
        option="Delete"
        title="anothereventXYZ"
        message="By agreeing, the event will be permanently deleted."
        onConfirm={handleDeleteEvent}
      />
    </>
  );
}
