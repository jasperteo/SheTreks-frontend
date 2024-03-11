import FollowBlock from "./FollowBlock";
import TwoTabs from "../UiComponents/TwoTabs";

export default function Following() {
  return (
    <TwoTabs
      leftTitle="FOLLOWERS"
      rightTitle="FOLLOWINGS"
      leftContent={<FollowBlock />}
      rightContent={<FollowBlock />}
    />
  );
}
