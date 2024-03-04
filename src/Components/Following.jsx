import FollowBlock from "./UiComponents/FollowBlock";
import TwoTabs from "./UiComponents/TwoTabs";

export default function Following() {
  return (
    <div className="mx-auto flex max-w-80 items-center justify-center">
      <TwoTabs
        leftTitle="FOLLOWERS"
        rightTitle="FOLLOWINGS"
        leftContent={<FollowBlock />}
        rightContent={<FollowBlock />}
      />
    </div>
  );
}
