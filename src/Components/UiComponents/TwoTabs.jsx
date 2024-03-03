import { useState } from "react";
import { tabColour, activeTabColour } from "../lib/ClassesName";

export default function TwoTabs({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
}) {
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
          {leftTitle}
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 2 ? `${activeTabColour} tab-active` : ""}`}
          onClick={() => updateToggle(2)}
        >
          {rightTitle}
        </a>
      </div>

      <div className={activeTab == 1 ? "block" : "hidden"}>{leftContent}</div>
      <div className={activeTab == 2 ? "block" : "hidden"}>{rightContent}</div>
    </div>
  );
}
