import { Link, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL, getRequest } from "../lib/Constants";
import SocialActivityCard from "../UiComponents/SocialActivityCard";

export default function Feed() {
  const currentUser = useOutletContext();

  const feed = useQuery({
    queryKey: ["feed", `${BACKEND_URL}/activities/feed/${currentUser?.id}`],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/feed/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/icons8-tourist-96.png" className="h-16 w-16" />
          <div className="ml-4 text-xl font-semibold">SheTreks</div>
        </div>
        <div className="flex gap-4">
          <Link to="/activity/add">
            <iconify-icon
              icon="ri:function-add-line"
              class="-mt-1 text-3xl text-neutral"
            />
          </Link>
        </div>
      </div>
      <SocialActivityCard colour="primary" activities={feed?.data} />
      {/* <div>
        {feed.data?.map((activity) => (
          <div
            className={`lg:card-sides card mt-8 bg-primary shadow-xl`}
            key={activity.id}
          >
            <div className="card-body">
              <div className="flex">
                <div className="flex-none">
                  <RoundedAvatar image={activity?.user?.imageUrl} size="8" />
                </div>

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
                  ? formatDateandTime(activity?.eventDate)
                  : activity?.participants?.some(
                        (participant) =>
                          participant?.user.id === currentUser?.id &&
                          participant?.status === true,
                      ) || activity?.user?.id === currentUser?.id
                    ? formatDateandTime(activity?.eventDate)
                    : formatDateMaskedTime(activity?.eventDate)}
              </div>
              <div>{activity?.description}</div>
              <div>Estimated Group Size: {activity?.group_size?.size}</div>
              <div>{activity?.address}</div>
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

              {activity?.imageUrl && (
                <img
                  className="mt-2 flex w-full object-cover"
                  src={activity.imageUrl}
                  alt="Activity Image"
                />
              )}

              <IndividualMap activity={activity} />

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
                          onClick={() =>
                            handleClick({
                              id: activity?.id,
                              title: activity?.title,
                              host: activity?.hostId,
                            })
                          }
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
      </div> */}
    </>
  );
}
