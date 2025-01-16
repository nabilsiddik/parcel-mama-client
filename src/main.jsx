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
import MyProfile from "./Dashboard/DashboardPages/MyProfile/MyProfile.jsx";
import Statistics from "./Dashboard/AdminPages/Statistics/Statistics.jsx";
import AllParcels from "./Dashboard/AdminPages/AllParcels/AllParcels.jsx";
import AllUsers from "./Dashboard/AdminPages/AllUsers/AllUsers.jsx";
import AllDeliveryMan from "./Dashboard/AdminPages/AllDeliveryMen/AllDeliveryMan.jsx";
import MyDeliveryList from "./Dashboard/DeliveryManPages/MyDeliveryList/MyDeliveryList.jsx";
import AllReviews from "./Dashboard/DeliveryManPages/AllReviews/AllReviews.jsx";

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
        path: "my-parcels",
        element: <MyParcels />,
      },
      {
        path: "update-parcel/:id",
        element: <UpdateParcel />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "all-parcels",
        element: <AllParcels />,
      },
      {
        path: 'all-users',
        element: <AllUsers/>
      },
      {
        path: 'all-delivery-man',
        element: <AllDeliveryMan></AllDeliveryMan>
      },
      {
        path: 'my-delivery-list',
        element: <MyDeliveryList/>
      },
      {
        path: 'all-reviews',
        element: <AllReviews/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client = {queryClient}>
      <AuthContextProvider>
        <RouterProvider router={route} />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
