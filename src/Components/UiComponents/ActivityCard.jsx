import UserSummProfile from "./UserSummProfile";
import { RoundedAvatar, dPinkIcon, darkPinkButton } from "../lib/ClassesName";
import { categoryIcon, BACKEND_URL, postRequest } from "../lib/Constants";
import { useMutation } from "@tanstack/react-query";

export default function ActivityCard({
  accOwnerImage,
  accOwnerUserName,
  accOwnerStatus,
  city,
  country,
  activityTitle,
  date,
  time,
  activityDescription,
  organiserImageURL,
  organiserFirstName,
  organiserUsername,
  activityImageURL,
  categoryApiId,
  catergoryName,
  currentUser,
  activityId,
}) {
  //Request to post request to join to backend
  const createRequestMutation = useMutation({
    mutationFn: (data) =>
      postRequest(`${BACKEND_URL}/activities/${activityId}/participants`, data),
  });

  //Handles the click event for the join now button
  //Posts requests to the backend to join the activity
  const handleClick = () => {
    console.log("clicked", currentUser);
    createRequestMutation.mutate({
      userId: currentUser.id,
    });
  };

  return (
    <>
      <div className="lg:card-sides card mt-8 bg-primary shadow-xl">
        <div className="card-body">
          <div className="flex">
            <div className="flex-none">
              <RoundedAvatar image={accOwnerImage} size="8" />
            </div>
            {/* to indicidate if user is an attendee */}
            <div className="ml-2 mt-1 flex-auto font-light italic">
              {accOwnerUserName} {accOwnerStatus}
            </div>
          </div>
          <div className="font-semibold">
            {city}, {country}
          </div>

          <div className="font-semibold">{activityTitle}</div>

          <div className="font-light italic">
            {date}, {time}
          </div>
          <div>{activityDescription}</div>
          <div className="flex flex-wrap items-center space-x-1 ">
            <div className={`${dPinkIcon}`}>
              <iconify-icon inline icon={`${categoryIcon(categoryApiId)}`} />
            </div>
            <div className="text-xs">{catergoryName}</div>
          </div>
          {/* //only show this portion if user is not the organiser */}
          <div className="font-semibold">Organiser:</div>
          <UserSummProfile
            userSummImageURL={organiserImageURL}
            userSummFirstName={organiserFirstName}
            userSummUsername={organiserUsername}
          />
        </div>
        <img
          className="-mt-2 object-none"
          src={activityImageURL}
          alt="Activity Image"
        />
        <figure>
          <img src="/map.png" alt="map" />
        </figure>
        {/* do not show the join now button if user is an attendee */}
        <div className="card-body -mb-4">
          <button
            className={`${darkPinkButton} mb-4 text-grey`}
            onClick={handleClick}
          >
            JOIN NOW
          </button>
        </div>
      </div>
    </>
  );
}
