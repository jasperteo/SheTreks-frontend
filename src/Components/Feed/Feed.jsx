import ActivityCard from "../UiComponents/ActivityCard";
import FeedHeader from "./FeedHeader";

export default function Feed() {
  return (
    <div>
      <FeedHeader />
      {/* To display a list of events joined and organized by the account owner's followings. */}
      <ActivityCard userStatus="(Organiser)" />
    </div>
  );
}
