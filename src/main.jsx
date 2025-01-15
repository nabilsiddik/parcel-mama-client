import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout.jsx";
import Home from "./Pages/Home/Home.jsx";
import AuthContextProvider from "./Contexts/AuthContext/AuthContext.jsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";
import Login from "./Pages/Login/Login.jsx";
import Registration from "./Pages/Registration/Registration.jsx";
import DashboardLayout from "./Layouts/DashboardLayout.jsx";
import Welcome from "./Dashboard/DashboardPages/Welcome/Welcome.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookParcel from "./Dashboard/DashboardPages/BookParcel/BookParcel.jsx";
import MyParcels from "./Dashboard/DashboardPages/MyParcels/MyParcels.jsx";
import UpdateParcel from "./Dashboard/DashboardPages/UpdateParcel/UpdateParcel.jsx";

const queryClient = new QueryClient();
const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "book-parcel",
        element: <BookParcel />,
      },
      {
        path: 'my-parcels',
        element: <MyParcels/>
      },
      {
        path: 'update-parcel/:id',
        element: <UpdateParcel/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client = {queryClient}>
        <RouterProvider router={route} />
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
