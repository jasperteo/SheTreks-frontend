import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import AddActivity from "./Components/AddActivity";
import ExploreActivities from "./Components/ExploreActivities";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Profile from "./Components/Profile/Profile";
import EditProfile from "./Components/Profile/EditProfile";
import Home from "./Components/Home";
import Following from "./Components/Following";
import NotificationMain from "./Components/Notification/NotificationMain";
import UpcomingEvents from "./Components/UpcomingEvents";
import Feed from "./Components/Feed/Feed";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL, getRequest } from "./Components/lib/Constants.js";

export default function App() {
  const { user } = useUser();
  const { userId: clerkUid, getToken } = useAuth();

  axios.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await getToken()}`;
    return config;
  });

  const { data: userData } = useQuery({
    queryKey: ["user", user, `${BACKEND_URL}/users/sync/${clerkUid}`],
    queryFn: () => getRequest(`${BACKEND_URL}/users/sync/${clerkUid}`),
    enabled: !!clerkUid,
  });

  const username = userData?.username;
  const userId = userData?.id;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
          <NavBar username={username} />
        </>
      ),
    },
    {
      path: "/activity",
      element: (
        <>
          <Outlet />
          <NavBar username={username} />
        </>
      ),
      children: [
        {
          path: "explore",
          element: <ExploreActivities />,
        },
        {
          path: "add",
          element: <AddActivity userId={userId} />,
        },
      ],
    },

    {
      path: `/profile`,
      element: (
        <>
          <Outlet />
          <NavBar username={username} />
        </>
      ),
      children: [
        {
          path: `:username`,
          element: <Profile username={username} />,
        },
        {
          path: "setting",
          element: <EditProfile />,
        },
        {
          path: "follow",
          element: <Following />,
        },
      ],
    },
    {
      path: "/notifications",
      element: (
        <>
          <NotificationMain />
          <NavBar username={username} />
        </>
      ),
    },
    {
      path: "/feeds",
      element: (
        <>
          <Feed />
          <NavBar username={username} />
        </>
      ),
    },
    {
      path: "/upcomingevents",
      element: (
        <>
          <UpcomingEvents />
          <NavBar username={username} />
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
    </>
  );
}
