import Error from "@/pages/Error/Error";
import Layout from "../layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home/Home/Home";
import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import Dashboard from "@/pages/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "@/private/PrivateRoute";
import BookParcel from "@/pages/Dashboard/Users/BookParcel/BookParcel";
import MyParcels from "@/pages/Dashboard/Users/MyParcels/MyParcels";
import Update from "@/pages/Dashboard/Users/MyParcels/Update";
import MyProfile from "@/pages/Dashboard/Users/MyProfile/MyProfile";
import AdminRoute from "@/private/AdminRoute";
import Statistics from "@/pages/Dashboard/Admin/Statistics/Statistics";
import AllParcels from "@/pages/Dashboard/Admin/AllParcels/AllParcels";
import AllUsers from "@/pages/Dashboard/Admin/AllUsers/AllUsers";
import MyDeliveryList from "@/pages/Dashboard/deliveryMen/MyDeliveryList/MyDeliveryList";
import MyReviews from "@/pages/Dashboard/deliveryMen/MyReviews/MyReviews";
import AllDeliveryMen from "@/pages/Dashboard/Admin/AllDeliveryMen/AllDeliveryMen";
import Success from "@/pages/Dashboard/Users/Payment/Success/Success";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "book-a-parcel",
            element: (
              <PrivateRoute>
                <BookParcel />
              </PrivateRoute>
            ),
          },
          {
            path: "my-parcels",
            element: (
              <PrivateRoute>
                <MyParcels />
              </PrivateRoute>
            ),
          },
          {
            path: "my-parcels/update/:id",
            element: (
              <PrivateRoute>
                <Update />
              </PrivateRoute>
            ),
          },
          {
            path: "my-profile",
            element: (
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            ),
          },
          {
            path: "statistics",
            element: (
              <AdminRoute>
                <Statistics />
              </AdminRoute>
            ),
          },
          {
            path: "all-parcels",
            element: (
              <AdminRoute>
                <AllParcels />
              </AdminRoute>
            ),
          },
          {
            path: "all-users",
            element: (
              <AdminRoute>
                <AllUsers />
              </AdminRoute>
            ),
            loader: () =>
              fetch(
                "https://percel-management-server-chi.vercel.app/users-count"
              ),
          },
          {
            path: "all-delivery-men",
            element: (
              <AdminRoute>
                <AllDeliveryMen />
              </AdminRoute>
            ),
          },
          {
            path: "my-delivery-list",
            element: (
              <PrivateRoute>
                <MyDeliveryList />
              </PrivateRoute>
            ),
          },
          {
            path: "my-reviews",
            element: (
              <PrivateRoute>
                <MyReviews />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/payment/success",
        element: <Success />,
      },
    ],
  },
]);
