import ActivityCard from "../ActivityCard";
import FeedHeader from "./FeedHeader";

export default function Feed() {
  return (
    <div>
      <FeedHeader />
      To show following - Organised and Joined
      <ActivityCard title="(Organiser)" />
    </div>
  );
}
