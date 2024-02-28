import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import AddActivity from "./Components/AddActivity";

export default function App() {
  return (
    <>
      <AddActivity />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
