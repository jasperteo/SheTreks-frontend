import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ActivityCard from "../ActivityCard";
import RequestCard from "../RequestCard";
import { pinkButton, semiBoldTxCen } from "../lib/Styles";
import { useParams } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Profile({ username }) {
  const params = useParams();
  if (params.username === username) {
    return (
      <>
        <div className="flex items-center">
          <div className="avatar w-24 flex-none">
            <div className="rounded-full">
              <UserButton
                appearance={{
                  elements: { avatarBox: "w-24 h-24" },
                }}
              />
            </div>
          </div>
          <div className={`${semiBoldTxCen} w-32 flex-auto`}>
            0 <br /> FOLLOWERS
          </div>
          <div className={`${semiBoldTxCen} w-32 flex-auto `}>
            0 <br /> FOLLOWING
          </div>
        </div>
        <div className="mt-2 font-semibold">First Name Last Name</div>
        <div className="font-light italic">@userName</div>
        <div>Hello! I am a human.</div>
        <Link to="/profile/setting">
          <button className={`${pinkButton} -mb-2 mt-2`}>
            Edit Profile/Following
          </button>
        </Link>
        <div className="-mb-12"></div>
        <ActivityCard />
        <RequestCard />
      </>
    );
  } else {
    return (
      <>
        <ProfileHeader />
        <div className="mt-2 font-semibold">First Name Last Name</div>
        <div className="font-light italic">@userName</div>
        <div>Hello! I am a human.</div>
        <Link to="/profile/follow">
          <button className={`${pinkButton} -mb-2 mt-2`}>Follow</button>
        </Link>
        <div className="-mb-12"></div>
        <ActivityCard />
        <RequestCard />
      </>
    );
  }
}
