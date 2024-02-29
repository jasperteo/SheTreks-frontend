import { pinkButton } from "./lib/Styles";
import FollowerRequest from "./UiComponents/FollowerRequest";
import FollowBlock from "./UiComponents/FollowBlock";

export default function Following() {
  return (
    <div>
      <FollowerRequest />
      <FollowerRequest />
      <FollowBlock />
    </div>
  );
}
