import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import ExploreActivities from "./Components/ExploreActivities.jsx";
import AddActivity from "./Components/AddActivity.jsx";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <ExploreActivities />
    
 
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
