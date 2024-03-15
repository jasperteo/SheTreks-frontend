import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { title } from "../../lib/ClassesName";
import TwoTabs from "../../UiComponents/TwoTabs";
import UpcomingOrgActCard from "./UpcomingOrgActCard";
import UpcomingJoinedActCard from "./UpcomingJoinedActCard";
import { BACKEND_URL, getRequest } from "../../lib/Constants";

export default function UpcomingEvents() {
  const currentUser = useOutletContext();

  const upcomingOrganisedActivities = useQuery({
    queryKey: [
      "upcomingOrganisedActivities",
      `${BACKEND_URL}/activities/includeHost/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/includeHost/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  const upcomingJoinedActivities = useQuery({
    queryKey: [
      "upcomingJoinedActivities",
      `${BACKEND_URL}/activities/joinedByHost/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/joinedByUser/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  return (
    <>
      <div className={`${title}`}>SCHEDULE</div>
      <TwoTabs
        leftTitle="ORGANISED"
        rightTitle="JOINED"
        leftContent={upcomingOrganisedActivities?.data?.map((activity) => (
          <UpcomingOrgActCard key={activity.id} activity={activity} />
        ))}
        rightContent={upcomingJoinedActivities?.data?.map((activity) => (
          <UpcomingJoinedActCard key={activity.id} activity={activity} />
        ))}
      />
    </>
  );
}
