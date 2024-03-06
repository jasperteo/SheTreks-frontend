import ActivityCard from "../UiComponents/ActivityCard";
import FeedHeader from "./FeedHeader";

export default function Feed() {
  const activity = {
    id: 12,
    hostId: 2,
    title: "Walk",
    description: "5km easy hike",
    imageUrl: "",
    cost: 10,
    locationId: 5,
    address: "MacRitchie Reservoir\n",
    latitude: null,
    longitude: null,
    eventDate: "2024-03-05T08:30:55.983Z",
    groupSizeId: 1,
    createdAt: "2024-03-04T08:32:05.660Z",
    updatedAt: "2024-03-04T08:32:05.660Z",
    user: {
      id: 2,
      clerkUid: "user_2dDSB43WRcZ6enhlk7ut98303US",
      email: "test2@test.com",
      username: "furbish",
      firstName: "Furb",
      lastName: "Bee",
      about: null,
      imageUrl:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yY21FakZ1ZmJndmR4cENRNXZJY2dUem5OclgiLCJyaWQiOiJ1c2VyXzJkRFNCNDNXUmNaNmVuaGxrN3V0OTgzMDNVUyIsImluaXRpYWxzIjoiRkIifQ",
      locationId: null,
      createdAt: "2024-03-04T08:30:19.954Z",
      updatedAt: "2024-03-04T08:30:21.129Z",
    },
    categories: [
      {
        id: 5,
        categoryName: "Wellness and Relaxation",
        createdAt: "2024-03-03T05:47:10.421Z",
        updatedAt: "2024-03-03T05:47:10.421Z",
        activity_categories: {
          activityId: 12,
          categoryId: 5,
          createdAt: "2024-03-04T08:32:05.819Z",
          updatedAt: "2024-03-04T08:32:05.819Z",
        },
      },
    ],
    location: {
      id: 5,
      country: "Singapore",
      city: "Singapore",
      createdAt: "2024-03-03T05:47:10.468Z",
      updatedAt: "2024-03-03T05:47:10.468Z",
    },
  };

  return (
    <div>
      <FeedHeader />
      {/* To display a list of events joined and organized by the account owner's followings. */}
      <ActivityCard
        // accOwnerImage="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        // accOwnerUserName="Fiona"
        // accOwnerStatus="(Attendee)"

        date="23 Jan 2023"
        activity={activity}
      />
    </div>
  );
}
