import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import AddActivity from "./AddActivity";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <AddActivity />
 
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
