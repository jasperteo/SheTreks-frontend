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
          <img src="/android-chrome-192x192.png" className="h-16 w-16" />
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
      {feed?.data?.map((activity) => (
        <SocialActivityCard
          key={activity.id}
          colour="primary"
          activity={activity}
        />
      ))}
    </>
  );
}
