import RoundedAvatar from "./RoundedAvatar";

export default function UserSummProfile({ user }) {
  return (
    <div className="flex" key={`${user?.id}`}>
      <div className="flex-none">
        <RoundedAvatar image={user?.imageUrl} size="8" />
      </div>
      <div className="ml-2 mt-1 flex-auto">{user?.firstName}</div>
      <div className="ml-2 mt-1 flex-auto font-light italic">
        {`@ ${user.username}`}
      </div>
    </div>
  );
}
// pass in user only, change all the props name to user.ImageUrl....just add a dot will do, then edit the remaining components.
