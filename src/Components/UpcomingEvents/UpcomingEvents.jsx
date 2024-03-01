import { title } from "../lib/ClassesName";
import UpcomingEventCard from "./UpcomingEventsCard";

export default function UpcomingEvents() {
  return (
    <>
      <div className={`${title}`}>UPCOMING EVENTS</div>
      <UpcomingEventCard />
    </>
  );
}
