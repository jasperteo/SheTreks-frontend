import { useState } from "react";
import { title, activeTabColour } from "../lib/ClassesName";
import UpOrgCard from "./UpOrgCard";
import UpJoinCard from "./UpJoinCard";

export default function UpcomingEvents() {
  const [activeTab, setActiveTab] = useState(1);

  function updateToggle(id) {
    setActiveTab(id);
  }
  const activeTabColour = "hover:text-secondary font-semibold";

  return (
    <>
      <div className={`${title}`}>UPCOMING EVENTS</div>
      <div role="tablist" className={`tabs tabs-bordered text-neutral`}>
        <a
          role="tab"
          className={`tab ${activeTab === 1 ? `tab tab-active ${activeTabColour}` : ""}`}
          onClick={() => updateToggle(1)}
        >
          ORGANISED
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 2 ? "tab-active" : ""}`}
          onClick={() => updateToggle(2)}
        >
          Joined
        </a>
      </div>

      <div className={activeTab == 1 ? "block" : "hidden"}>
        {" "}
        <UpOrgCard />
      </div>
      <div className={activeTab == 2 ? "block" : "hidden"}>
        <UpJoinCard />
      </div>
    </>
  );
}
