import ActivityCard from "../UiComponents/ActivityCard";
import FeedHeader from "./FeedHeader";

export default function Feed() {
  return (
    <>
      <FeedHeader />
      {/* To display a list of events joined and organized by the account owner's followings. */}
      {/* <ActivityCard
        accOwnerImage="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        accOwnerUserName="Fiona"
        accOwnerStatus="(Attendee)"
        city="Hanoi"
        country="Vietnam"
        activityTitle="Fly Fly"
        date="23 Jan 2023"
        time="08:00AM"
        activityDescription="Feel like a garbage bag!"
        organiserImageURL="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        organiserFirstName="Tay Tay"
        organiserUsername="swiftieeee"
        activityImageURL="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
        categoryApiId={1}
        catergoryName="Fooddd"
      /> */}
    </>
  );
}
