import { greyButton, brGreenButton } from "../lib/ClassesName";

export default function FollowBlock() {
  return (
    <div className="flex items-start justify-between gap-2 ">
      <img
        loading="lazy"
        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        className="mt-3 aspect-[1.06] w-12 rounded-full"
      />
      <div className=" mr-10 mt-3 flex flex-1 flex-col">
        <div className="whitespace-nowrap text-lg font-bold text-black">
          Cat Tan
        </div>
        <div className="text-sm font-medium text-black text-opacity-50">
          @cryingKitty{" "}
        </div>
      </div>

      <button className={greyButton}>Remove</button>
    </div>
  );
}
