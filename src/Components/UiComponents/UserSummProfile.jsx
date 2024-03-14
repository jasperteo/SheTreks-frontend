import RoundedAvatar from "./RoundedAvatar";

export default function UserSummProfile({ user }) {
  return (
    <div className="flex" key={user?.user?.id}>
      <div className="flex-none">
        <RoundedAvatar image={user?.user?.imageUrl} size="8" />
      </div>
      <div className="ml-2 mt-1 flex-auto">{user?.user?.firstName}</div>
      <div className="ml-2 mt-1 flex-auto font-light italic">
        @{user?.user?.username}
      </div>
    </div>
  );
}
