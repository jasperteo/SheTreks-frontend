import UpcomingOrgActCard from "./UpcomingOrgActCard";
import UpcomingJoinedActCard from "./UpcomingJoinedActCard";
import TwoTabs from "../../UiComponents/TwoTabs";
import { title } from "../../lib/ClassesName";

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
