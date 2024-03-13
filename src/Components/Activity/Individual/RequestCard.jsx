import { useMutation, useQueryClient } from "@tanstack/react-query";
import PopUpConfirmation from "../../UiComponents/PopUpConfirmation";
import UserSummProfile from "../../UiComponents/UserSummProfile";
import {
  chatIcon,
  brGreenButton,
  darkPinkButton,
  lgreyIcon,
} from "../../lib/ClassesName";
import {
  BACKEND_URL,
  deleteRequest,
  putRequest,
  postRequest,
} from "../../lib/Constants";
import { useParams, useOutletContext } from "react-router-dom";

export default function RequestCard({ participant, activity }) {
  const currentUser = useOutletContext();
  const queryClient = useQueryClient();
  const params = useParams();

  //Posts requests for notification triggered when user is accepted or rejected by organizer
  const { mutate: notifyParticipant } = useMutation({
    mutationFn: (notifData) =>
      postRequest(`${BACKEND_URL}/users/notifications`, notifData),
  });

  //If organiser accepts the request, the user is added to the activity as participant
  const { mutate: acceptParticipant } = useMutation({
    mutationFn: () =>
      putRequest(`${BACKEND_URL}/activities/participants/${participant?.id}`),
    onSuccess: () => {
      notifyParticipant({
        recipientId: participant?.user?.id,
        senderId: currentUser?.id,
        notifMessage: `${currentUser?.firstName} ${currentUser?.lastName} (@${currentUser?.username}) has approved your request to join ${activity.title}.`,
      });
      queryClient.invalidateQueries({
        queryKey: [
          "singleActivity",
          `${BACKEND_URL}/activities/${params.activityId}`,
        ],
      });
    },
  });

  //If organiser rejects the request, the user is removed from the activity
  const { mutate: declineParticipant } = useMutation({
    mutationFn: () =>
      deleteRequest(
        `${BACKEND_URL}/activities/participants/${participant?.id}`,
      ),
    onSuccess: () => {
      notifyParticipant({
        recipientId: participant?.user?.id,
        senderId: currentUser?.id,
        notifMessage: `${currentUser?.firstName} ${currentUser?.lastName} (@${currentUser?.username}) has rejected your request to join ${activity.title}.`,
      });
      queryClient.invalidateQueries({
        queryKey: [
          "singleActivity",
          `${BACKEND_URL}/activities/${params.activityId}`,
        ],
      });
    },
  });

  return (
    <>
      <div className="lg:card-sides card card-body mt-4 bg-info shadow-xl">
        <div className="font-semibold">Requests</div>
        <UserSummProfile user={participant} />
        <div>User is requesting to join the acitivty.</div>
        <div className="-mb-8 flex items-start">
          <button className={`${darkPinkButton}  mr-2 mt-2 flex-auto`}>
            <iconify-icon icon={chatIcon} class={lgreyIcon} />
          </button>
          <button
            className={`${brGreenButton} mr-2 mt-2 flex-auto`}
            onClick={() =>
              document
                .getElementById(`accept-user${participant?.id}`)
                .showModal()
            }
          >
            <iconify-icon icon="ri:check-line" class={lgreyIcon} />
          </button>
          <button
            className="btn-grey focus:ring-green-500 btn mr-2 mt-2 flex-auto focus:outline-none focus:ring-2"
            onClick={() =>
              document
                .getElementById(`decline-user${participant?.id}`)
                .showModal()
            }
          >
            <iconify-icon
              icon="ri:close-line"
              class="content-center text-3xl text-warning"
            />
          </button>
        </div>
      </div>
      <PopUpConfirmation
        id={`accept-user${participant?.id}`}
        option="Accept"
        title="user participation?"
        message="By agreeing, user can participate in the activity."
        onConfirm={acceptParticipant}
      />
      <PopUpConfirmation
        id={`decline-user${participant?.id}`}
        option="Decline"
        title="user participation?"
        message="By agreeing, user is unable to participate in the activity."
        onConfirm={declineParticipant}
      />
    </>
  );
}
