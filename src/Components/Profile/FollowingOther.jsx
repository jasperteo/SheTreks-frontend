import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRequest, BACKEND_URL } from "../lib/Constants.js";
import TwoTabs from "../UiComponents/TwoTabs";
import FollowBlock from "./FollowBlock";

export default function Following() {
  const params = useParams();

  const userInfo = useQuery({
    queryKey: ["userInfo", `${BACKEND_URL}/users/profile/${params.username}`],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/profile/${params.username}`),
  });

  const followers = useQuery({
    queryKey: [
      "followers",
      `${BACKEND_URL}/users/followers/${userInfo?.data?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/followers/${userInfo?.data?.id}`),
    enabled: !!userInfo.data,
  });

  const following = useQuery({
    queryKey: [
      "following",
      `${BACKEND_URL}/users/following/${userInfo?.data?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/users/following/${userInfo?.data?.id}`),
    enabled: !!userInfo.data,
  });

  return (
    <>
      <Link to={-1}>
        <iconify-icon class="text-3xl" icon="ri:arrow-left-s-line" />
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
