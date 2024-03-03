import UserSummProfile from "./UserSummProfile";
import { RoundedAvatar, dPinkIcon, darkPinkButton } from "../lib/ClassesName";

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
}) {
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
          <div className="gap flex flex-wrap items-center -space-y-1 space-x-1">
            <div className={`${dPinkIcon}`}>
              <iconify-icon icon="ri:plant-line" />
            </div>
            <div className="mb-4 mt-2 text-xs">Cat 100 Tay tay concert</div>
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
          src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
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
