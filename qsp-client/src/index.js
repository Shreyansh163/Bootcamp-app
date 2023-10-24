import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import Signup from "./components/auth/Signup";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/profiles/Dashboard";
import ProtectedRoute from "./helpers/ProtectedRoute";
import PublicRoute from "./helpers/PublicRoute";
import AdminRoute from "./helpers/AdminRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import Bootcamp from "./components/admin/Bootcamp";
import AdminHome from "./components/admin/AdminHome";
import AdminContent from "./components/admin/AdminContent";
import UpdateBootcamp from "./components/admin/UpdateBootcamp";
import ViewBootcamp from "./components/admin/ViewBootcamp";
import ProfileHome from "./components/profiles/ProfileHome";
import CreateProfile from "./components/profiles/CreateProfile";
import ViewProfile from "./components/profiles/ViewProfile";
import UpdateProfile from "./components/profiles/UpdateProfile";
import UploadPhoto from "./components/profiles/UploadPhoto";

let router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ProfileHome />
              </ProtectedRoute>
            ),
          },
          {
            path: "/profile/upload-photo",
            element: (
              <ProtectedRoute>
                <UploadPhoto />
              </ProtectedRoute>
            ),
          },
          {
            path: "/profile/create-profile",
            element: (
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>
            ),
          },
          {
            path: "/profile/view-profile/:id",
            element: (
              <ProtectedRoute>
                <ViewProfile />
              </ProtectedRoute>
            ),
          },
          {
            path: "/profile/update-profile/:id",
            element: (
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <AdminRoute>
                <AdminHome />
              </AdminRoute>
            ),
          },
          {
            path: "/admin/create-bootcamp",
            element: (
              <AdminRoute>
                <AdminContent />
              </AdminRoute>
            ),
          },
          {
            path: "/admin/bootcamps",
            element: (
              <AdminRoute>
                <Bootcamp />
              </AdminRoute>
            ),
          },
          {
            path: "/admin/update-bootcamp/:id",
            element: (
              <AdminRoute>
                <UpdateBootcamp />
              </AdminRoute>
            ),
          },
          {
            path: "/admin/view-bootcamp/:id",
            element: (
              <AdminRoute>
                <ViewBootcamp />
              </AdminRoute>
            ),
          },
        ],
      },
      {
        path: "/bootcamps",
        element: <Bootcamp />,
      },
      {
        path: "/view-bootcamp/:id",
        element: <ViewBootcamp />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.querySelector("#root")).render(
  <RouterProvider router={router}></RouterProvider>
);
