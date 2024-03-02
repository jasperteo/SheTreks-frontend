import { useState } from "react";
import {
  title,
  activeTabColour,
  tabColour,
  brGreenButton,
  greyButton,
} from "../lib/ClassesName";
import UpcomingOrgActCard from "./UpcomingOrgActCard";
import UpcomingJoinedActCard from "./UpcomingJoinedActCard";

export default function UpcomingEvents() {
  const [activeTab, setActiveTab] = useState(1);

  function updateToggle(id) {
    setActiveTab(id);
  }

  return (
    <>
      <div className={`${title}`}>UPCOMING EVENTS</div>
      <div role="tablist" className={`${tabColour}`}>
        <a
          role="tab"
          className={`tab ${activeTab === 1 ? `${activeTabColour} tab-active` : ""}`}
          onClick={() => updateToggle(1)}
        >
          ORGANISED
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 2 ? `${activeTabColour} tab-active` : ""}`}
          onClick={() => updateToggle(2)}
        >
          Joined
        </a>
      </div>

      <div className={activeTab == 1 ? "block" : "hidden"}>
        {" "}
        <UpcomingOrgActCard />
      </div>
      <div className={activeTab == 2 ? "block" : "hidden"}>
        <UpcomingJoinedActCard />
      </div>
    </>
  );
}
