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
import UpcomingEvents from "./Components/Activity/UpcomingActs/UpcomingEvents";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
          <NavBar />
        </>
      ),
    },
    {
      path: "/activity",
      element: (
        <>
          <NavBar />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "explore",
          element: <ExploreActivities />,
        },
        {
          path: "add",
          element: <AddActivity />,
        },
      ],
    },

    {
      path: `/profile`,
      element: (
        <>
          <NavBar />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "username",
          element: <Profile />,
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
          <NavBar />
        </>
      ),
    },
    {
      path: "/feeds",
      element: (
        <>
          <Feed />
          <NavBar />
        </>
      ),
    },
    {
      path: "/upcomingevents",
      element: (
        <>
          <UpcomingEvents />
          <NavBar />
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}
