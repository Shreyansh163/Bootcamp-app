import React, { useContext } from "react";
import { AuthContext } from "./../../apis/AuthContext";
import Spinner from "../../helpers/Spinner";
import gravatarUrl from "gravatar-url";
import ProfileSidebar from "./ProfileSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  

  return (
    <section className="profile">
      <article className="flex h-[90.5vh]">
        <ProfileSidebar />
        <div className="basis-4/5">
          <Outlet />
        </div>
      </article>
    </section>
  );
};

export default Dashboard;
