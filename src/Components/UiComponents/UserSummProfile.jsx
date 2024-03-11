import RoundedAvatar from "./RoundedAvatar";

export default function UserSummProfile({ user }) {
  return (
    <div className="flex" key={`${user?.user?.id}`}>
      <div className="flex-none">
        <RoundedAvatar image={user?.user?.imageUrl} size="8" />
      </div>
      <div className="ml-2 mt-1 flex-auto">{user?.user?.firstName}</div>
      <div className="ml-2 mt-1 flex-auto font-light italic">
        {`@ ${user?.user?.username}`}
      </div>
    </div>
  );
}
// pass in user only, change all the props name to user.ImageUrl....just add a dot will do, then edit the remaining components.
