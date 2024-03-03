import UpcomingOrgActCard from "./UpcomingOrgActCard";
import UpcomingJoinedActCard from "./UpcomingJoinedActCard";
import TwoTabs from "../../UiComponents/TwoTabs";

export default function UpcomingEvents() {
  return (
    <>
      <TwoTabs
        leftTitle="ORGANISED"
        rightTitle="JOINED"
        leftContent={<UpcomingOrgActCard />}
        rightContent={<UpcomingJoinedActCard />}
      />
    </>
  );
}
