import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import AddActivity from "./Components/AddActivity";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Profile from "./Components/Profile/Profile";
import EditProfile from "./Components/Profile/EditProfile";
import Home from "./Components/Home";

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
      element: <NavBar />,
      children: [
        {
          path: "userID",
          element: <Profile />,
        },
        {
          path: "setting",
          element: <EditProfile />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
