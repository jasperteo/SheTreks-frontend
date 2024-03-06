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
import Feed from "./Components/Feed/Feed";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BACKEND_URL,
  getRequest,
  axiosAuth,
  CurrentUserContext,
} from "./Components/lib/Constants.js";
import UpcomingEvents from "./Components/Activity/UpcomingActs/UpcomingEvents";
import SingleAct from "./Components/Activity/Individual/SingleAct";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SignedOut, SignedIn } from "@clerk/clerk-react";

export default function App() {
  const { user } = useUser();
  const { userId: clerkUid, getToken } = useAuth();

  axiosAuth.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await getToken()}`;
    return config;
  });

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser", user, `${BACKEND_URL}/users/sync/${clerkUid}`],
    queryFn: () => getRequest(`${BACKEND_URL}/users/sync/${clerkUid}`),
    enabled: !!clerkUid,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <SignedOut>
            <Home />
          </SignedOut>
          <SignedIn>
            <Outlet />
            <NavBar />
          </SignedIn>
        </>
      ),
      children: [
        { index: true, element: <Home /> },
        {
          path: "activity",
          children: [
            {
              path: "explore",
              element: <ExploreActivities />,
            },
            {
              path: "add",
              element: <AddActivity />,
            },
            {
              path: ":activityId/request",
              element: <SingleAct />,
            },
          ],
        },
        {
          path: `profile`,
          children: [
            { index: true, element: <Profile /> },
            {
              path: `:username`,
              element: <Profile />, //change to other profile
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
          path: "notifications",
          element: <NotificationMain />,
        },
        {
          path: "feeds",
          element: <Feed />,
        },
        {
          path: "upcomingevents",
          element: <UpcomingEvents />,
        },
      ],
    },
  ]);
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </CurrentUserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
    </>
  );
}
