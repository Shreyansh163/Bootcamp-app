import React from "react";
import NavbarContainer from "../components/navbar/NavbarContainer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "../apis/AuthContext";

const RootLayout = () => {
  return (
    <div>
      <AuthProvider>
        <NavbarContainer />
        <Toaster position="top-right" reverseOrder={false} />
        <Outlet />
      </AuthProvider>
    </div>
  );
};

export default RootLayout;
