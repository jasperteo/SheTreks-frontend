import FollowBlock from "./FollowBlock";
import TwoTabs from "../UiComponents/TwoTabs";
import { useQuery } from "@tanstack/react-query";
import { getRequest, BACKEND_URL } from "../lib/Constants.js";
import { Link, useOutletContext } from "react-router-dom";

export default function Following() {
  const currentUser = useOutletContext();

  const followers = useQuery({
    queryKey: [
      "followers",
      `${BACKEND_URL}/users/followers/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/followers/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  const following = useQuery({
    queryKey: [
      "following",
      `${BACKEND_URL}/users/following/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/following/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  return (
    <>
      <Link to={-1}>
        <iconify-icon icon="ri:arrow-left-s-line" />
      </Link>
      <TwoTabs
        leftTitle="FOLLOWERS"
        rightTitle="FOLLOWINGS"
        leftContent={<FollowBlock followers={followers} />}
        rightContent={<FollowBlock following={following} />}
      />
    </>
  );
}
