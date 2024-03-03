import FollowBlock from "./UiComponents/FollowBlock";
import TwoTabs from "./UiComponents/TwoTabs";

export default function Following() {
  return (
    <div>
      <TwoTabs
        leftTitle="FOLLOWERS"
        rightTitle="FOLLOWINGS"
        leftContent={<FollowBlock />}
        rightContent={<FollowBlock />}
      />
    </div>
  );
}
