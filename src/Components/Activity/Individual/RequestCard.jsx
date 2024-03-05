import PopUpConfirmation from "../../UiComponents/PopUpConfirmation";
import UserSummProfile from "../../UiComponents/UserSummProfile";
import {
  chatIcon,
  brGreenButton,
  darkPinkButton,
  lgreyIcon,
} from "../../lib/ClassesName";

export default function RequestCard({
  participantFirstName,
  participantImageURL,
  participantUserName,
}) {
  const handleAcceptParticipant = () => {
    console.log("Accept User!");
    //close modal after clicking "ok"
    const dialog = document.querySelector("#accept-user");
    dialog.close();
  };

  const handleDeclineParticipant = () => {
    console.log("Decline User!");
    //close modal after clicking "ok"
    const dialog = document.querySelector("#decline-user");
    dialog.close();
  };

  return (
    <>
      <div className="lg:card-sides card card-body mt-4 bg-info shadow-xl">
        <div className="font-semibold">Requests</div>
        <UserSummProfile
          userSummImageURL={`${participantImageURL}`}
          userSummFirstName={participantFirstName}
          userSummUsername={participantUserName}
        />
        <div>User is requesting to join the acitivty.</div>
        <div className="-mb-8 flex items-start">
          <button className={`${darkPinkButton}  mr-2 mt-2 flex-auto`}>
            <iconify-icon icon={chatIcon} class={lgreyIcon} />
          </button>
          <button
            className={`${brGreenButton} mr-2 mt-2 flex-auto`}
            onClick={() => document.getElementById("accept-user").showModal()}
          >
            <iconify-icon icon="ri:check-line" class={lgreyIcon} />
          </button>
          <button
            className="btn-grey focus:ring-green-500 btn mr-2 mt-2 flex-auto focus:outline-none focus:ring-2"
            onClick={() => document.getElementById("decline-user").showModal()}
          >
            <iconify-icon
              icon="ri:close-line"
              class="content-center text-3xl text-warning"
            />
          </button>
        </div>
      </div>
      <PopUpConfirmation
        id="accept-user"
        option="Accept"
        title="user participation?"
        message="By agreeing, user can participate in the activity."
        onConfirm={handleAcceptParticipant}
      />
      <PopUpConfirmation
        id="decline-user"
        option="Decline"
        title="user participation?"
        message="By agreeing, user is unable to participate in the activity."
        onConfirm={handleDeclineParticipant}
      />
    </>
  );
}
