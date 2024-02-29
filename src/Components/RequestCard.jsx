import {
  RoundedAvatar,
  brGreenButton,
  darkPinkButton,
  greyButton,
  lgreyIcon,
} from "./lib/Styles";

export default function RequestCard() {
  return (
    <>
      <div className="lg:card-sides card mt-8 bg-info shadow-xl">
        <div className="card-body -mb-8">
          <div className="font-semibold">Request</div>
          <div className="flex">
            <div className="flex-none">
              <RoundedAvatar
                image="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                size="8"
              />
            </div>
            <div className="ml-2 mt-1 flex-auto">First Name</div>
            <div className="ml-2 mt-1 flex-auto font-light italic">
              @userName
            </div>
          </div>
          <div>User is requesting to join the acitivty.</div>
          <div className="flex">
            <button className={`${darkPinkButton}  mr-2 mt-2 flex-auto`}>
              <iconify-icon icon="ri:chat-4-line" class={lgreyIcon} />
            </button>
            <button className={`${brGreenButton} mr-2 mt-2 flex-auto`}>
              <iconify-icon icon="ri:check-line" class={lgreyIcon} />
            </button>
            <button className={`${greyButton}  mr-2 mt-2 flex-auto`}>
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
