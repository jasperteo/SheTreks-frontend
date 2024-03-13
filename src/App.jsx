import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignedOut, SignedIn, useAuth, useUser } from "@clerk/clerk-react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddActivity from "./Components/AddActivity";
import ExploreActivities from "./Components/ExploreActivities";
import NavBar from "./Components/NavBar";
import Profile from "./Components/Profile/Profile";
import EditProfile from "./Components/Profile/EditProfile";
import ProfileOther from "./Components/Profile/ProfileOther";
import FollowingOther from "./Components/Profile/FollowingOther";
import Home from "./Components/Home";
import Following from "./Components/Profile/Following";
import NotificationMain from "./Components/Notification/NotificationMain";
import Feed from "./Components/Feed/Feed";
import {
  BACKEND_URL,
  getRequest,
  axiosAuth,
  CurrentUserContext,
} from "./Components/lib/Constants";
import UpcomingEvents from "./Components/Activity/UpcomingActs/UpcomingEvents";
import SingleAct from "./Components/Activity/Individual/SingleAct";
import { APIProvider } from "@vis.gl/react-google-maps";

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
            <div className="m-auto max-w-7xl p-8 pb-24">
              <Outlet context={currentUser} />
              <NavBar currentUser={currentUser} />
            </div>
          </SignedIn>
        </>
      ),
      children: [
        { index: true, element: <Home /> },
        {
          path: "feeds",
          element: <Feed />,
        },
        {
          path: "explore",
          element: <ExploreActivities />,
        },
        {
          path: "notifications",
          element: <NotificationMain />,
        },
        {
          path: "upcomingevents",
          element: <UpcomingEvents />,
        },
        {
          path: `profile`,
          children: [
            { index: true, element: <Profile /> },
            {
              path: `:username`,
              children: [
                { index: true, element: <ProfileOther /> },
                { path: "follow", element: <FollowingOther /> },
              ],
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
          path: "activity",
          children: [
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
      ],
    },
  ]);
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </APIProvider>
      </CurrentUserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
    </>
  );
}
