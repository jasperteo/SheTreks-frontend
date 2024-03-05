import UserSummProfile from "../../UiComponents/UserSummProfile";
import { title } from "../../lib/ClassesName";
import RequestCard from "./RequestCard";
import {
  BACKEND_URL,
  formatDateandTime,
  getRequest,
} from "../../lib/Constants";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function SingleAct() {
  //extract :activityid
  const params = useParams();
  // console.log(params.activityId);

  const singleActivity = useQuery({
    queryKey: [
      "singleActivity",
      `${BACKEND_URL}/activities/${params.activityId}`,
    ],
    queryFn: () => getRequest(`${BACKEND_URL}/activities/${params.activityId}`),
  });

  console.log("data", singleActivity?.data);

  // put a ? between data and property. if a?.b?.c if a, and b exists, and c does not. the line == null

  return (
    <>
      <div className="leading-8" key={singleActivity?.data?.id}>
        <div className={`${title}`}>{singleActivity?.data?.title}</div>
        <div className="font-semibold">
          {singleActivity?.data?.location.city},
          {singleActivity?.data?.location.country}
        </div>
        <div>{formatDateandTime(singleActivity?.data?.eventDate)}</div>
        {/* confirmed participants' are true, request are false. Delete declined request*/}
        {singleActivity?.data?.participants.map((participant) =>
          participant.status === true ? (
            <>
              <div className="mb-2 font-semibold">Participants:</div>
              <UserSummProfile
                key={participant?.user.id}
                userSummImageURL={participant?.user.imageUrl}
                userSummFirstName={participant?.user.firstName}
                userSummUsername={`@${participant?.user.username}`}
              />
            </>
          ) : null,
        )}
        {singleActivity?.data?.participants.map((participant) =>
          participant.status === false ? (
            <RequestCard
              key={participant?.id}
              status={participant.status}
              participantId={participant?.id}
              participantImageURL={participant?.user.imageUrl}
              participantFirstName={participant?.user.firstName}
              participantUserName={`@${participant?.user.username}`}
            />
          ) : null,
        )}
      </div>
    </>
  );
}
