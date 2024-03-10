import UserSummProfile from "./UserSummProfile";
import RoundedAvatar from "./RoundedAvatar";
import { dPinkIcon } from "../lib/ClassesName";
import { Fragment, useContext } from "react";
import {
  CurrentUserContext,
  categoryIcon,
  formatDateandTime,
} from "../lib/Constants";

export default function PastActivityCard({ colour, activities }) {
  console.log(activities);
  const currentUser = useContext(CurrentUserContext);

  return (
    <div>
      {activities &&
        activities.map((activity) => (
          <div
            className={`lg:card-sides card mt-8 bg-${colour} shadow-xl`}
            key={activity.id}
          >
            <div className="card-body">
              <div className="flex">
                <div className="flex-none">
                  <RoundedAvatar image={currentUser?.imageUrl} size="8" />
                </div>
                {/* to indicidate if user is an attendee */}
                <div className="ml-2 mt-1 flex-auto font-light italic">
                  {`@ ${currentUser.username}`}
                  {activity?.hostId !== currentUser?.id
                    ? " (Attendee)"
                    : " (Organiser)"}
                </div>
              </div>
              <div className="font-semibold">
                {activity?.location?.city}, {activity?.location?.country}
              </div>

              <div className="font-semibold">{activity?.title}</div>

              <div className="font-light italic">
                {formatDateandTime(activity.eventDate)}
              </div>
              <div>{activity.description}</div>
              <div className="items-left flex flex-col flex-wrap space-x-1 ">
                {activity.categories.map((category) => (
                  <div className={`${dPinkIcon}`} key={category?.id}>
                    <iconify-icon
                      inline
                      icon={`${categoryIcon(category?.id)}`}
                    />
                    <p className="text-xs">{category?.categoryName}</p>
                  </div>
                ))}
              </div>
              {/* remove organiser section if user is the organiser */}

              {activity?.hostId !== currentUser?.id ? (
                <div className="font-semibold">
                  Organiser:
                  <Fragment key={activity?.user?.id}>
                    <UserSummProfile user={activity} />
                  </Fragment>
                </div>
              ) : null}
              <div className="font-semibold">Participants:</div>
              {activity?.participants &&
                activity?.participants.map((participant) =>
                  participant?.status === true ? (
                    <Fragment key={participant?.id}>
                      <UserSummProfile user={participant} />
                    </Fragment>
                  ) : null,
                )}
            </div>
          </div>
        ))}
    </div>
  );
}
