import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ActivityCard from "../ActivityCard";
import RequestCard from "../Activity/Individual/RequestCard.jsx";
import { pinkButton, tabColour, activeTabColour } from "../lib/ClassesName.jsx";
import { useState } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState(1);

  function updateToggle(id) {
    setActiveTab(id);
  }
  return (
    <>
      <ProfileHeader />
      <div className="mt-2 font-semibold">First Name Last Name</div>
      <div className="font-light italic">@userName</div>
      <div>Hello! I am a human.</div>
      <div className="flex justify-start">
        <Link to="/profile/setting">
          <button className={`${pinkButton} mr-8 mt-2`}>
            Edit Profile/Following
          </button>
        </Link>
        <Link to="/activity/add">
          <button className={`${pinkButton} mt-2`}>Add Activity</button>
        </Link>
      </div>
      <div className="mb-8" />
      <div>
        <div role="tablist" className={`${tabColour}`}>
          <a
            role="tab"
            className={`tab ${activeTab === 1 ? `${activeTabColour} tab-active` : ""}`}
            onClick={() => updateToggle(1)}
          >
            CURRENT EVENTS
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === 2 ? `${activeTabColour} tab-active` : ""}`}
            onClick={() => updateToggle(2)}
          >
            PAST EVENTS
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === 3 ? `${activeTabColour} tab-active` : ""}`}
            onClick={() => updateToggle(3)}
          >
            PAST ATTENDANCES
          </a>
        </div>

        <div className={activeTab == 1 ? "block" : "hidden"}>
          <p>DIFFERENT</p>
        </div>
        <div className={activeTab == 2 ? "block" : "hidden"}></div>
        <div className={activeTab == 3 ? "block" : "hidden"}></div>
      </div>
      <ActivityCard />
      <RequestCard />
    </>
  );
}
