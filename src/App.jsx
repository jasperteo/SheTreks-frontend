import { useState } from "react";
import "./App.css";
import AddActivity from "./AddActivity";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <AddActivity />
      {/* <div className="flex items-center justify-center">
        <img
          width="200"
          src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/200/external-tourist-tropical-flaticons-lineal-color-flat-icons.png"
          alt="external-tourist-tropical-flaticons-lineal-color-flat-icons"
        />
      </div>
      <h1 className="font-sans text-6xl font-bold">
        SheTreks Illusion 1234567890
        <iconify-icon inline icon="line-md:phone-call-twotone-loop" />
      </h1>
      <button
        className="btn btn-accent btn-active"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button> */}
    </>
  );
}
