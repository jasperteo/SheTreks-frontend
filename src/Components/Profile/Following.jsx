import { Link, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRequest, BACKEND_URL } from "../lib/Constants.js";
import TwoTabs from "../UiComponents/TwoTabs";
import FollowBlock from "./FollowBlock";

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
        <iconify-icon class="text-3xl" icon="ri:arrow-left-s-line" />
      </Link>
      <TwoTabs
        leftTitle="FOLLOWERS"
        rightTitle="FOLLOWING"
        leftContent={followers?.data?.rows?.map((follow) => (
          <FollowBlock key={follow.id} follow={follow} remove={true} />
        ))}
        rightContent={following?.data?.rows?.map((follow) => (
          <FollowBlock key={follow.id} follow={follow} />
        ))}
      />
    </>
  );
}
