import { useState } from "react";
import { tabColour, activeTabColour } from "../lib/ClassesName";

export default function TwoTabs({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
}) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div role="tablist" className={`${tabColour} mb-8`}>
        <button
          role="tab"
          className={`tab ${activeTab === 1 && `${activeTabColour} tab-active`}`}
          aria-label="Tab 1"
          onClick={() => setActiveTab(1)}
        >
          {leftTitle}
        </button>
        <button
          role="tab"
          className={`tab ${activeTab === 2 && `${activeTabColour} tab-active`}`}
          aria-label="Tab 2"
          onClick={() => setActiveTab(2)}
        >
          {rightTitle}
        </button>
      </div>

      <div role="tabpanel" className={activeTab == 1 ? "block" : "hidden"}>
        {leftContent}
      </div>
      <div role="tabpanel" className={activeTab == 2 ? "block" : "hidden"}>
        {rightContent}
      </div>
    </div>
  );
}
