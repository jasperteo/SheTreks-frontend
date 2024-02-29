import FollowerRequest from "./UiComponents/FollowerRequest";
import FollowBlock from "./UiComponents/FollowBlock";
import { tab } from "./lib/Styles";
import { useStaticPicker } from "@mui/x-date-pickers/internals";
import { useState } from "react";

export default function Following() {
  const [toggle, setToggle] = useState(1);

  function updateToggle(id) {
    setToggle(id);
  }

  return (
    <div>
      <button type="button" className={tab} onClick={() => updateToggle(1)}>
        Follower
      </button>
      <button type="button" className={tab} onClick={() => updateToggle(2)}>
        Following
      </button>
      <button type="button" className={tab} onClick={() => updateToggle(3)}>
        Requests
      </button>

      <div className={toggle == 1 ? "block" : "hidden"}>
        <FollowBlock />
        <p>DIFFERENT</p>
      </div>
      <div className={toggle == 2 ? "block" : "hidden"}>
        <FollowBlock />
      </div>
      <div className={toggle == 3 ? "block" : "hidden"}>
        <FollowerRequest />
        <FollowerRequest />
      </div>
    </div>
  );
}
