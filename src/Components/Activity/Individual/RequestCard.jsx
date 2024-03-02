import UserSummProfile from "../../UiComponents/UserSummProfile";
import {
  chatIcon,
  RoundedAvatar,
  brGreenButton,
  darkPinkButton,
  greyButton,
  lgreyIcon,
} from "../../lib/ClassesName";

export default function RequestCard() {
  return (
    <>
      <div className="lg:card-sides card mt-8 bg-info shadow-xl">
        <div className="card-body -mb-8">
          <div className="font-semibold">Requests</div>
          <UserSummProfile />
          <div>User is requesting to join the acitivty.</div>
          <div className="flex items-start">
            <button className={`${darkPinkButton}  mr-2 mt-2 flex-auto`}>
              <iconify-icon icon={chatIcon} class={lgreyIcon} />
            </button>
            <button className={`${brGreenButton} mr-2 mt-2 flex-auto`}>
              <iconify-icon icon="ri:check-line" class={lgreyIcon} />
            </button>
            <button className="btn-grey focus:ring-green-500 btn mr-2 mt-2 flex-auto focus:outline-none focus:ring-2">
              <iconify-icon
                icon="ri:close-line"
                class="content-center text-3xl text-neutral"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
