import FollowerRequest from "./UiComponents/FollowerRequest";
import FollowBlock from "./UiComponents/FollowBlock";
import { useStaticPicker } from "@mui/x-date-pickers/internals";
import { useState } from "react";

export default function Following() {
  const [activeTab, setActiveTab] = useState(1);

  function updateToggle(id) {
    setActiveTab(id);
  }

  return (
    <div>
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
          onClick={() => updateToggle(1)}
        >
          Followers
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 2 ? "tab-active" : ""}`}
          onClick={() => updateToggle(2)}
        >
          Following
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 3 ? "tab-active" : ""}`}
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
