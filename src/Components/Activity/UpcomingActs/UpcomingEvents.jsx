import UpcomingOrgActCard from "./UpcomingOrgActCard";
import UpcomingJoinedActCard from "./UpcomingJoinedActCard";
import TwoTabs from "../../UiComponents/TwoTabs";
import { title } from "../../lib/ClassesName";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL, getRequest } from "../../lib/Constants";

export default function UpcomingEvents() {
  const currentUserId = 1;

  const upcomingOrgActivity = useQuery({
    queryKey: [
      "upcomingOrgActs",
      `${BACKEND_URL}activities/includeHost/${currentUserId}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}activities/includeHost/${currentUserId}`),
  });

  console.log(upcomingOrgActivity.data);

  return (
    <>
      <div className={`${title}`}>SCHEDULE</div>
      <TwoTabs
        leftTitle="ORGANISED"
        rightTitle="JOINED"
        leftContent={
          upcomingOrgActivity.data &&
          upcomingOrgActivity.data.map((post) => (
            <UpcomingOrgActCard key={post.id} title={post.title} />
          ))
        }
        rightContent={<UpcomingJoinedActCard />}
      />
    </>
  );
}
