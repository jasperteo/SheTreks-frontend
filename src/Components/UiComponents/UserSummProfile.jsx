import { RoundedAvatar } from "../lib/ClassesName.jsx";

export default function UserSummProfile({
  userSummImageURL,
  userSummFirstName,
  userSummUsername,
}) {
  return (
    <div className="flex">
      <div className="flex-none">
        <RoundedAvatar image={userSummImageURL} size="8" />
      </div>
      <div className="ml-2 mt-1 flex-auto">{userSummFirstName}</div>
      <div className="ml-2 mt-1 flex-auto font-light italic">
        {userSummUsername}
      </div>
    </div>
  );
}
