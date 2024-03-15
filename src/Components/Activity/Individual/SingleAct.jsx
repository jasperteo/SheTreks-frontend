import { Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { title } from "../../lib/ClassesName";
import {
  BACKEND_URL,
  formatDateandTime,
  getRequest,
} from "../../lib/Constants";
import UserSummProfile from "../../UiComponents/UserSummProfile";
import RequestCard from "./RequestCard";

export default function SingleAct() {
  const params = useParams();

  const singleActivity = useQuery({
    queryKey: [
      "singleActivity",
      `${BACKEND_URL}/activities/${params.activityId}`,
    ],
    queryFn: () => getRequest(`${BACKEND_URL}/activities/${params.activityId}`),
  });

  return (
    <>
      <Link to={-1}>
        <iconify-icon class="text-3xl" icon="ri:arrow-left-s-line" />
      </Link>
      <div className="leading-8" key={singleActivity?.data?.id}>
        <div className={`${title}`}>{singleActivity?.data?.title}</div>
        <div className="font-semibold">
          {singleActivity?.data?.location?.city},
          {singleActivity?.data?.location?.country}
        </div>
        <div>{formatDateandTime(singleActivity?.data?.eventDate)}</div>
        <div>
          Estimated Group Size: {singleActivity?.data?.group_size?.size}
        </div>
        <div>{singleActivity?.data?.address}</div>
        {singleActivity?.data?.participants.map((participant) =>
          participant.status ? (
            <Fragment key={participant?.id}>
              <div className="mb-2 font-semibold">Participants:</div>
              <UserSummProfile user={participant} />
            </Fragment>
          ) : !participant.status ? (
            <RequestCard
              participant={participant}
              activity={singleActivity?.data}
              key={participant?.id}
            />
          ) : null,
        )}
      </div>
    </>
  );
}
