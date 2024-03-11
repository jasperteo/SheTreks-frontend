import { Link } from "react-router-dom";
import UserSummProfile from "../../UiComponents/UserSummProfile";
import PopUpConfirmation from "../../UiComponents/PopUpConfirmation";
import RoundedAvatar from "../../UiComponents/RoundedAvatar";
import { chatIcon, darkPinkButton, brGreenButton } from "../../lib/ClassesName";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  BACKEND_URL,
  CurrentUserContext,
  formatDateandTime,
  getRequest,
} from "../../lib/Constants";
import { useContext, useState } from "react";
import { Fragment } from "react";
import { Map, InfoWindow, AdvancedMarker } from "@vis.gl/react-google-maps";

export default function UpcomingOrgActCard() {
  const currentUser = useContext(CurrentUserContext);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const queryClient = useQueryClient();

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
  console.log(upcomingOrgActivity.data);

  const handleDeleteEvent = (activity) => {
    console.log("Event deleted!", activity);
    //close modal after clicking "ok"
    // const dialog = document.querySelector("#delete-event");
    // dialog.close();
  };

  return (
    <>
      <div id="upcoming-map" style={{ height: "40vh", width: "100%" }}>
        <Map
          defaultCenter={{
            lat: 1.287953,
            lng: 103.851784,
          }}
          defaultZoom={12}
          mapId="upcoming-map"
        >
          {upcomingOrgActivity?.data &&
            upcomingOrgActivity.data.map((activity) => (
              <AdvancedMarker
                key={activity.id}
                position={{
                  lat: activity?.latitude,
                  lng: activity?.longitude,
                }}
                offsetLeft={-20}
                offsetTop={-10}
                title={activity?.title}
                onClick={() => {
                  activity === selectedPlace
                    ? setSelectedPlace(null)
                    : setSelectedPlace(activity);
                }}
              ></AdvancedMarker>
            ))}
          {selectedPlace && (
            <InfoWindow
              position={{
                lat: selectedPlace?.latitude,
                lng: selectedPlace?.longitude,
              }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <p>{selectedPlace.title}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>

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
                    <Fragment key={participant?.id}>
                      <div className="font-semibold">Participants:</div>
                      <UserSummProfile user={participant} />
                    </Fragment>
                  ) : null,
                )}
              {/* if there is no request, do not show view request button. Hit the first "false" status and break. */}
              {activity?.participants && (
                <>
                  {activity.participants.some(
                    (participant) => !participant.status,
                  ) && (
                    <Link to={`/activity/${activity.id}/request`}>
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
            <dialog id="delete-event" className="modal ">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-ghost btn-sm absolute right-2 top-2">
                    <iconify-icon icon="ri:close-large-fill" />
                  </button>
                </form>
                <div className="mt-8 text-center font-semibold ">
                  Delete {activity?.title}?
                </div>
                <div className="text-center">
                  By agreeing, the event will be permanently deleted.
                </div>
                <div className="-mb-4 flex justify-center">
                  <button
                    className={`${brGreenButton} mr-4 mt-4 text-grey`}
                    onClick={() => handleDeleteEvent(activity)}
                  >
                    OK
                  </button>
                  <form method="dialog">
                    <button className="btn-grey focus:ring-green-500 btn mt-4 focus:outline-none focus:ring-2">
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))}
    </>
  );
}
