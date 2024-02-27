import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex items-center justify-center">
        <img
          width="500"
          src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/500/external-tourist-tropical-flaticons-lineal-color-flat-icons.png"
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
      </button>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
