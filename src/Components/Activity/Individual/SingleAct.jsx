import UserSummProfile from "../../UiComponents/UserSummProfile";
import { title } from "../../lib/ClassesName";
import RequestCard from "./RequestCard";

export default function SingleAct() {
  return (
    <div className="leading-8">
      <div className={`${title}`}>XYZ Event</div>
      <div className="font-semibold">Hanoi, Vietnam</div>
      <div>Date, Exact Time</div>
      <div className="mb-2 font-semibold">Participants:</div>
      <UserSummProfile
        userSummImageURL="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        userSummFirstName="Dragon"
        userSummUsername="@dragggonn"
      />
      <RequestCard
        participantImageURL="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        participantFirstName="Elsa"
        participantUserName="@iceQueen"
      />
    </div>
  );
}
