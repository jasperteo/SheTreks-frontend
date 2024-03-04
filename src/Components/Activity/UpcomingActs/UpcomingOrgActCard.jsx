import { Link } from "react-router-dom";
import UserSummProfile from "../../UiComponents/UserSummProfile";
import PopUpConfirmation from "../../UiComponents/PopUpConfirmation";
import { RoundedAvatar, chatIcon, darkPinkButton } from "../../lib/ClassesName";

export default function UpcomingOrgActCard({ title }) {
  const handleDeleteEvent = () => {
    console.log("Event deleted!");
    //close modal after clicking "ok"
    const dialog = document.querySelector("#delete-event");
    dialog.close();
  };

  return (
    <>
      <div className="lg:card-sides card mt-8 bg-primary shadow-xl">
        <div className="card-body">
          <div className="flex">
            <div className="flex-none">
              <RoundedAvatar
                image="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                size="8"
              />
            </div>
            <div className="ml-2 mt-1 flex-auto font-light italic">
              @organiser
            </div>
            {/* to change URL link */}
            <Link to="/">
              <iconify-icon
                icon={chatIcon}
                class="mr-2 text-3xl text-secondary"
              />
            </Link>
            <Link to="/">
              <iconify-icon
                icon="ri:calendar-check-line"
                class="mr-2 text-3xl text-success"
              />
            </Link>
            <iconify-icon
              icon="ri:delete-bin-line"
              class="text-3xl text-neutral"
              onClick={() =>
                document.getElementById("delete-event").showModal()
              }
            />
          </div>
          <div className="font-semibold">Hanoi, Vietnam</div>
          <div className="font-semibold">{title}</div>
          <div>Date, Exact Time</div>
          <div>Address</div>
          <div className="font-semibold">Participants:</div>
          <UserSummProfile
            userSummImageURL="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            userSummFirstName="FirstName"
            userSummUsername="@userName"
          />
          <Link to="/activity/request">
            <button
              className={`${darkPinkButton} mb-2 mt-2 size-full text-grey`}
            >
              VIEW REQUEST
            </button>
          </Link>
        </div>
        <figure>
          <img src="/map.png" alt="map" />
        </figure>
      </div>
      {/* pop up modal */}
      <PopUpConfirmation
        id="delete-event"
        option="Delete"
        title="anothereventXYZ"
        message="By agreeing, the event will be permanently deleted."
        onConfirm={handleDeleteEvent}
      />
    </>
  );
}
