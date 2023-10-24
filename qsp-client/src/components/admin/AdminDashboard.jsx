import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <section className="admin">
      <article className="flex h-[90.5vh]">
        <AdminSidebar />
        <div className="basis-4/5">
          <Outlet />
        </div>
      </article>
    </section>
  );
};

export default AdminDashboard;

// name, description, averageRating, careers, averageCost, housing , jobAssistance, job
