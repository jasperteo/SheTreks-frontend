import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import AddActivity from "./Components/AddActivity";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Profile from "./Components/Profile/Profile";
import EditProfile from "./Components/Profile/EditProfile";
import Home from "./Components/Home";
import Following from "./Components/Following";
import NotificationMain from "./Components/Notification/NotificationMain";
import UpcomingEvents from "./Components/UpcomingEvents";
import Feed from "./Components/Feed/Feed";

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
          <AddActivity />
          <NavBar />
        </>
      ),
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
