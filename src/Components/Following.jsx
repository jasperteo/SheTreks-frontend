import FollowerRequest from "./UiComponents/FollowerRequest";
import FollowBlock from "./UiComponents/FollowBlock";
import { useStaticPicker } from "@mui/x-date-pickers/internals";
import { useState } from "react";
import { tabColour, activeTabColour } from "./lib/ClassesName";

export default function Following() {
  const [activeTab, setActiveTab] = useState(1);

  function updateToggle(id) {
    setActiveTab(id);
  }

  return (
    <div>
      <div role="tablist" className={`${tabColour}`}>
        <a
          role="tab"
          className={`tab ${activeTab === 1 ? `${activeTabColour} tab-active` : ""}`}
          onClick={() => updateToggle(1)}
        >
          Followers
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 2 ? `${activeTabColour} tab-active` : ""}`}
          onClick={() => updateToggle(2)}
        >
          Following
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 3 ? `${activeTabColour} tab-active` : ""}`}
          onClick={() => updateToggle(3)}
        >
          Requests
        </a>
      </div>

      <div className={activeTab == 1 ? "block" : "hidden"}>
        <FollowBlock />
        <p>DIFFERENT</p>
      </div>
      <div className={activeTab == 2 ? "block" : "hidden"}>
        <FollowBlock />
      </div>
      <div className={activeTab == 3 ? "block" : "hidden"}>
        <FollowerRequest />
        <FollowerRequest />
      </div>
    </div>
  );
}
