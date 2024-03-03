import FollowBlock from "./UiComponents/FollowBlock";
import TwoTabs from "./UiComponents/TwoTabs";

export default function Following() {
  return (
    <div>
      <TwoTabs
        leftTitle="Followers"
        rightTitle="Followings"
        leftContent={<FollowBlock />}
        rightContent={<FollowBlock />}
      />
    </div>
  );
}
