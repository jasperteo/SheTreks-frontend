import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <img
        width="200"
        height="200"
        src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/200/external-tourist-tropical-flaticons-lineal-color-flat-icons.png"
        alt="external-tourist-tropical-flaticons-lineal-color-flat-icons"
      />
      <h1 style={{ fontSize: "4em" }}>
        SheTreks Illusion 1234567890
        <iconify-icon inline icon="line-md:phone-call-twotone-loop" />
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
