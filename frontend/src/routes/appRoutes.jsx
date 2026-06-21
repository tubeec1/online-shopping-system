import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import PublicProducts from "../pages/public/PublicProducts";
import ProductDetails from "../pages/public/ProductDetails";
import Cart from "../pages/public/Cart";
import Checkout from "../pages/public/Checkout";
import Signup from "../pages/public/Signup";
import Login from "../pages/public/Login";
import MyProfile from "../pages/public/MyProfile";
import CategoryDetails from "../pages/public/CategoryDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";

import Users from "../pages/dashboard/Users";

import Payments from "../pages/dashboard/Payments";
import Orders from "../pages/dashboard/Orders";
import DashhboardProducts from "../pages/dashboard/DashboardProducts";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import TrackOrder from "../pages/public/TrackOrder";
import DashboardProducts from "../pages/dashboard/DashboardProducts";
import Profile from "../pages/dashboard/Profile";
import MyOrders from "../pages/dashboard/MyOrders";
import Reports from "../pages/dashboard/Reports";
import Categories from "../pages/dashboard/Categories";
import Setting from "../pages/dashboard/Setting";

let appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <PublicProducts />,
      },

      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "category-details/:categoryName",
        element: <CategoryDetails />,
      },
      {
        path: "/my-profile",
        element: <MyProfile />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },

      {
        path: "/track-order",
        element: <TrackOrder />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <DashboardProducts />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "settings",
        element: <Setting />,
      },
    ],
  },
]);

export default appRoutes;
