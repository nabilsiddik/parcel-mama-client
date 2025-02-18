import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout.jsx";
import Home from "./Pages/Home/Home.jsx";
import AuthContextProvider from "./Contexts/AuthContext/AuthContext.jsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import BookParcel from "./Dashboard/DashboardPages/BookParcel/BookParcel.jsx";
import MyParcels from "./Dashboard/DashboardPages/MyParcels/MyParcels.jsx";
import UpdateParcel from "./Dashboard/DashboardPages/UpdateParcel/UpdateParcel.jsx";
import MyProfile from "./Dashboard/DashboardPages/MyProfile/MyProfile.jsx";
import Statistics from "./Dashboard/AdminPages/Statistics/Statistics.jsx";
import AllParcels from "./Dashboard/AdminPages/AllParcels/AllParcels.jsx";
import AllUsers from "./Dashboard/AdminPages/AllUsers/AllUsers.jsx";
import AllDeliveryMan from "./Dashboard/AdminPages/AllDeliveryMen/AllDeliveryMan.jsx";
import MyDeliveryList from "./Dashboard/DeliveryManPages/MyDeliveryList/MyDeliveryList.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import AuthenticationPage from "./Pages/AuthenticationPage/AuthenticationPage";
import LoginCard from "./Components/LoginCard/LoginCard";
import RegistrationCard from "./Components/RegistrationCard/RegistrationCard";
import DashboardHome from "./Dashboard/DashboardHome/DashboardHome";
import Checkout from "./Dashboard/DashboardPages/Checkout/Checkout";
import PaymentSuccess from "./Dashboard/DashboardPages/PaymentSuccess/PaymentSuccess";
import AdminRoute from "./PrivateRoute/AdminRoute";
import MyReviews from "./Dashboard/DeliveryManPages/AllReviews/MyReviews.jsx";
import ParcelContextProvider from "./Contexts/ParcelContext/ParcelContext";

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
        path: "/authentication",
        element: <AuthenticationPage />,
        children: [
          {
            path: 'login',
            element: <LoginCard />
          },
          {
            path: "registration",
            element: <RegistrationCard />,
          },
        ]
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardHome />
    </PrivateRoute>,
    children: [
      {
        path: "book-parcel",
        element: <PrivateRoute>
          <BookParcel />
        </PrivateRoute>,
      },
      {
        path: "my-parcels",
        element: <PrivateRoute>
          <MyParcels />
        </PrivateRoute>,
      },
      {
        path: "update-parcel/:id",
        element: <PrivateRoute>
          <UpdateParcel />
        </PrivateRoute>,
      },
      {
        path: "my-profile",
        element: <PrivateRoute>
          <MyProfile />
        </PrivateRoute>,
      },
      {
        path: "statistics",
        element: <AdminRoute>
          <Statistics />
        </AdminRoute>,
      },
      {
        path: "all-parcels",
        element: <AdminRoute>
          <AllParcels />
        </AdminRoute>,
      },
      {
        path: 'all-users',
        element: <AdminRoute>
          <AllUsers />
        </AdminRoute>
      },
      {
        path: 'all-delivery-man',
        element: <AdminRoute>
          <AllDeliveryMan />
        </AdminRoute>
      },
      {
        path: 'my-delivery-list',
        element: <PrivateRoute>
          <MyDeliveryList />
        </PrivateRoute>
      },
      {
        path: 'my-reviews',
        element: <PrivateRoute>
          <MyReviews />
        </PrivateRoute>
      },
      {
        path: 'checkout/:parcelId',
        element: <PrivateRoute>
          <Checkout />
        </PrivateRoute>
      },
      {
        path: 'payment-success/:transactionId',
        element: <PrivateRoute>
          <PaymentSuccess />
        </PrivateRoute>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ParcelContextProvider>
          <RouterProvider router={route} />
        </ParcelContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
