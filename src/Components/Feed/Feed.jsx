import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FeedHeader from "./FeedHeader";
import {
  BACKEND_URL,
  CurrentUserContext,
  categoryIcon,
  formatDateMaskedTime,
  formatDateandTime,
  getRequest,
  postRequest,
} from "../lib/Constants";
import { useContext } from "react";
import RoundedAvatar from "../UiComponents/RoundedAvatar";
import { dPinkIcon, darkPinkButton } from "../lib/ClassesName";
import UserSummProfile from "../UiComponents/UserSummProfile";

export default function Feed() {
  const currentUser = useContext(CurrentUserContext);
  const queryClient = useQueryClient();

  const feedActivities = useQuery({
    queryKey: [
      "feedActivitieis",
      `${BACKEND_URL}/activities/feed/${currentUser?.id}/`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/feed/${currentUser?.id}`),
    enabled: !!currentUser?.id,
  });

  console.log(feedActivities.data);

  const { mutate: mutateJoin } = useMutation({
    mutationFn: (data) =>
      postRequest(
        `${BACKEND_URL}/activities/${data.activityId}/participants`,
        data,
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [
          "feedActivitieis",
          `${BACKEND_URL}/activities/feed/${currentUser?.id}/`,
        ],
      }),
  });

  const handleClick = (activityId) =>
    mutateJoin({ activityId, userId: currentUser.id });

  return (
    <>
      <FeedHeader />
      <div>
        {feedActivities.data?.map((activity) => (
          <div
            className={`lg:card-sides card mt-8 bg-primary shadow-xl`}
            key={activity.id}
          >
            <div className="card-body">
              <div className="flex">
                <div className="flex-none">
                  <RoundedAvatar image={activity?.user?.imageUrl} size="8" />
                </div>
                {/* to indicidate if user is an attendee */}
                <div className="ml-2 mt-1 flex-auto font-light italic">
                  {`@${activity?.user?.username}`}
                </div>
              </div>
              <div className="font-semibold">
                {activity?.location?.city}, {activity?.location?.country}
              </div>

              <div className="font-semibold">{activity?.title}</div>

              <div className="font-light italic">
                {new Date(activity?.eventDate) < new Date()
                  ? formatDateandTime(activity?.eventDate) // past events
                  : activity?.participants?.some(
                        (participant) =>
                          participant?.user.id === currentUser?.id &&
                          participant?.status === true,
                      )
                    ? formatDateandTime(activity?.eventDate)
                    : formatDateMaskedTime(activity?.eventDate)}
              </div>
              <div>{activity?.description}</div>
              <div>Estimated Group Size: {activity?.group_size?.size}</div>
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

              <div className="font-semibold">Organiser:</div>
              <UserSummProfile user={activity} key={activity?.user?.id} />

              {/* for the current page */}
              {/* show list of paricipants when the length of participants' status = true is more than 1 */}
              <>
                {activity?.participants?.some(
                  (participant) => !!participant?.status,
                ) && (
                  <>
                    <div className="font-semibold">Participants:</div>
                    {activity?.participants?.map(
                      (participant) =>
                        !!participant?.status && (
                          <UserSummProfile
                            user={participant}
                            key={participant?.id}
                          />
                        ),
                    )}
                  </>
                )}
              </>
              {/* When I view another person's account, 
              //the card should show the join button if i am not the host, participant.
              //button should not appear in my profile when i view my profile.
              //the button should only be available in current section (future events) */}
              {activity?.hostId !== currentUser?.id &&
                new Date(activity?.eventDate) > new Date() && (
                  <div className="card-body -mb-4">
                    {activity?.participants?.some(
                      (participant) =>
                        participant?.user.id === currentUser?.id &&
                        !participant?.status,
                    ) ? (
                      <button
                        className={`${darkPinkButton} -mb-4 -mt-4 text-grey`}
                        disabled
                      >
                        REQUESTED
                      </button>
                    ) : (
                      activity?.participants?.some(
                        (participant) =>
                          participant?.user.id === currentUser?.id &&
                          participant?.status,
                      ) || (
                        <button
                          className={`${darkPinkButton} -mb-4 -mt-4 text-grey`}
                          onClick={() => handleClick(activity.id)}
                        >
                          JOIN NOW
                        </button>
                      )
                    )}
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
