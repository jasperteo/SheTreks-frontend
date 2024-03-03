import ActivityCard from "../ActivityCard";
import FeedHeader from "./FeedHeader";

export default function Feed() {
  return (
    <div>
      <FeedHeader />
      {/* To show people that i follow - show only the list of Organised and Joined
      events */}
      <ActivityCard title="(Organiser)" />
    </div>
  );
}
