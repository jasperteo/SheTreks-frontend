import UserSummProfile from "../../UiComponents/UserSummProfile";
import { title } from "../../lib/ClassesName";
import RequestCard from "./RequestCard";

export default function SingleAct() {
  return (
    <div>
      <div className={`${title}`}>"XYZ Event" Request</div>
      <div className="font-semibold">Hanoi, Vietnam</div>
      <div>Date, Exact Time</div>
      <div>Remaining Seat Count: </div>
      <div className="font-semibold">Participants:</div>
      <UserSummProfile />
      <RequestCard />
    </div>
  );
}
