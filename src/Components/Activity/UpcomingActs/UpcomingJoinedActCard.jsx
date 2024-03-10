import { Link } from "react-router-dom";
import UserSummProfile from "../../UiComponents/UserSummProfile";
import PopUpConfirmation from "../../UiComponents/PopUpConfirmation";
import { chatIcon } from "../../lib/ClassesName";
import RoundedAvatar from "../../UiComponents/RoundedAvatar";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BACKEND_URL,
  CurrentUserContext,
  formatDateandTime,
  getRequest,
} from "../../lib/Constants";
import { Map, InfoWindow, AdvancedMarker } from "@vis.gl/react-google-maps";

export default function UpcomingJoinedActCard() {
  const currentUser = useContext(CurrentUserContext);
  const [selectedPlace, setSelectedPlace] = useState(null);

  console.log("user", currentUser);

  const upcomingJoinedActivity = useQuery({
    queryKey: [
      "upcomingJoinedActs",
      `${BACKEND_URL}/activities/joinedByHost/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/joinedByUser/${currentUser?.id}`),
    enabled: !!currentUser?.id, // i have to wait for all depencies to load. so if i depends on 2 "data", i need to include !!a.id && b.id (it must be in boolean)
  });

  console.log(upcomingJoinedActivity.data);

  const handleWithdrawEvent = () => {
    console.log("Event withdraw!");
    //close modal after clicking "ok"
    const dialog = document.querySelector("#withdraw-event");
    dialog.close();
  };

  return (
    <>
      <div id="joined-map" style={{ height: "40vh", width: "100%" }}>
        <Map
          defaultCenter={{
            lat: 1.287953,
            lng: 103.851784,
          }}
          defaultZoom={12}
          mapId="joined-map"
        >
          {upcomingJoinedActivity?.data &&
            upcomingJoinedActivity.data.map((activity) => (
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
                    document.getElementById("withdraw-event").showModal()
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
              id="withdraw-event"
              option="Withdraw"
              title="event123"
              message="By agreeing, we will withdraw you from the event."
              onConfirm={handleWithdrawEvent}
            />
          </div>
        ))}
    </>
  );
}
