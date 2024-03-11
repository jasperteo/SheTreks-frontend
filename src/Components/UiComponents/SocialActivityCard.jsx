import UserSummProfile from "./UserSummProfile";
import RoundedAvatar from "./RoundedAvatar";
import { dPinkIcon, darkPinkButton } from "../lib/ClassesName";
import { useContext, useState } from "react";
import {
  BACKEND_URL,
  CurrentUserContext,
  categoryIcon,
  formatDateMaskedTime,
  formatDateandTime,
  postRequest,
} from "../lib/Constants";
import { useMutation } from "@tanstack/react-query";

export default function SocialActivityCard({ colour, activities, user }) {
  // console.log(activities);
  // console.log(user);

  const currentUser = useContext(CurrentUserContext);
  const [requestSent, setRequestSent] = useState(false);

  const handleClick = (activityId) =>
    mutateJoin({ activityId, userId: currentUser.id });

  const { mutate: mutateJoin } = useMutation({
    mutationFn: (data) =>
      postRequest(`${BACKEND_URL}/activities/${data.activityId}/participants`, {
        userId: data.userId,
      }),
    onSuccess: () => setRequestSent(true),
  });

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
                  <RoundedAvatar image={user?.imageUrl} size="8" />
                </div>
                {/* to indicidate if user is an attendee */}
                <div className="ml-2 mt-1 flex-auto font-light italic">
                  {`@${user?.username}`}
                  {activity?.hostId !== user?.id
                    ? " (Attendee)"
                    : " (Organiser)"}
                </div>
              </div>
              <div className="font-semibold">
                {activity?.location?.city}, {activity?.location?.country}
              </div>

              <div className="font-semibold">{activity?.title}</div>

              <div className="font-light italic">
                {new Date(activity?.eventDate) < new Date()
                  ? formatDateandTime(activity?.eventDate) // past events
                  : activity?.hostId !== currentUser?.id &&
                      !activity?.participants?.some(
                        (participant) =>
                          participant?.user.id === currentUser?.id &&
                          participant?.status === true,
                      )
                    ? formatDateMaskedTime(activity?.eventDate)
                    : formatDateandTime(activity?.eventDate)}
              </div>
              <div>{activity?.description}</div>
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

              {activity?.hostId !== user?.id && (
                <>
                  <div className="font-semibold">Organiser:</div>
                  <UserSummProfile user={activity} />
                </>
              )}
              {/* for the current page */}
              {/* show list of paricipants when the length of participants' status = true is more than 1 
              Hide "Participant" status is true length's length is 0*/}

              {activity?.participants &&
                activity?.participants.some(
                  (participant) => participant?.status === true,
                ) && (
                  <>
                    <div className="font-semibold">Participants:</div>
                    {activity?.participants
                      .filter((participant) => participant?.status === true)
                      .map((participant) => (
                        <div key={participant?.id}>
                          <UserSummProfile user={participant} />
                        </div>
                      ))}
                  </>
                )}
            </div>
            {/* When I view another person's account, 
              //the card should show the join button if i am not the host, participant.
              //button should not appear in my profile when i view my profile.
              //the button should only be available in current section (future events) */}
            {activity?.hostId !== currentUser?.id &&
            !activity?.participants?.some(
              (participant) => participant?.user.id === currentUser?.id,
            ) &&
            new Date(activity?.eventDate) > new Date() ? (
              <div className="card-body -mb-4">
                {/* //Request was previosuly sent, but not approved or declined. Do not allow user to submit another request. */}
                {activity?.participants?.some((participant) => {
                  return (
                    participant?.user.id === currentUser?.id &&
                    participant?.status === false
                  );
                }) ? null : (
                  <>
                    {requestSent ? (
                      <div className="text-center text-neutral">
                        REQUEST SENT!
                      </div>
                    ) : (
                      <button
                        className={`${darkPinkButton} -mb-4 -mt-4 text-grey`}
                        onClick={() => {
                          handleClick(activity.id);
                          setRequestSent(true);
                        }}
                      >
                        JOIN NOW
                      </button>
                    )}
                  </>
                )}
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
}
