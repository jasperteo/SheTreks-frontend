import { title } from "../../lib/ClassesName";
import TwoTabs from "../../UiComponents/TwoTabs";
import UpcomingOrgActCard from "./UpcomingOrgActCard";
import UpcomingJoinedActCard from "./UpcomingJoinedActCard";

export default function UpcomingEvents() {
  return (
    <>
      <div className={`${title}`}>SCHEDULE</div>
      <TwoTabs
        leftTitle="ORGANISED"
        rightTitle="JOINED"
        leftContent={<UpcomingOrgActCard />}
        rightContent={<UpcomingJoinedActCard />}
      />
    </>
  );
}
