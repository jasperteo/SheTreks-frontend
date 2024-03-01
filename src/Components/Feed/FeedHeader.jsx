import { Link } from "react-router-dom";
import { chatIcon } from "../lib/ClassesName";

export default function FeedHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src="/icons8-tourist-96.png" className="h-16 w-16" />
        <div className="ml-4 text-xl font-semibold">SheTreks</div>
      </div>
      {/* <Link to="/"> */}
      <iconify-icon icon={chatIcon} class="-mt-1 text-3xl text-neutral" />
      {/* </Link> */}
    </div>
  );
}
