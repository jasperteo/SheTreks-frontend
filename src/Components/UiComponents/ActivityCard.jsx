import UserSummProfile from "./UserSummProfile";
import { RoundedAvatar, dPinkIcon, darkPinkButton } from "../lib/ClassesName";
import { categoryIcon } from "../lib/Constants";

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
}) {
  // console.log(categoryApiId);
  // console.log(categoryIcon(categoryApiId));
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
          <button className={`${darkPinkButton} mb-4 text-grey`}>
            JOIN NOW
          </button>
        </div>
      </div>
    </>
  );
}
