import { Link } from "react-router-dom";
import UserSummProfile from "../../UiComponents/UserSummProfile";
import PopUpConfirmation from "../../UiComponents/PopUpConfirmation";
import { RoundedAvatar, chatIcon, darkPinkButton } from "../../lib/ClassesName";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL, getRequest } from "../../lib/Constants";

export default function UpcomingOrgActCard() {
  const currentUserId = 1;

  const upcomingOrgActivity = useQuery({
    queryKey: [
      "upcomingOrgActs",
      `${BACKEND_URL}activities/includeHost/${currentUserId}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}activities/includeHost/${currentUserId}`),
  });

  console.log(upcomingOrgActivity.data);

  //format date and time ()
  function formatDateandTime(dateString) {
    const eventDate = new Date(dateString);
    const formattedDate = eventDate.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedDate;
  }

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
            className="lg:card-sides card mt-8 bg-primary shadow-xl"
            key={activity.id}
          >
            <div className="card-body">
              <div className="flex">
                <div className="flex-none">
                  <RoundedAvatar
                    image="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    size="8"
                  />
                </div>
                <div className="ml-2 mt-1 flex-auto font-light italic">
                  @organiser
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
                {activity.location.city}, {activity.location.country}
              </div>
              <div className="font-semibold">{activity.title}</div>
              <div>{formatDateandTime(activity.eventDate)}</div>
              <div>{activity.address}</div>
              <div className="font-semibold">Participants:</div>
              <UserSummProfile
                userSummImageURL="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                userSummFirstName="FirstName"
                userSummUsername="@userName"
              />
              <Link to="/activity/request">
                <button
                  className={`${darkPinkButton} mb-2 mt-2 size-full text-grey`}
                >
                  VIEW REQUEST
                </button>
              </Link>
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
