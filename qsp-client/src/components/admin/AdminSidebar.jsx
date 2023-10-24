import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <article className="basis-1/5 bg-white border-t-[1px] drop-shadow-sm flex flex-col gap-3 p-2">
      <aside>
        <NavLink
          to="/admin"
          // className={({ isActive }) =>
          //   isActive
          //     ? "bg-orange-600 text-white py-2 px-3 rounded-sm flex items-center gap-1 "
          //     : "text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 transition-ease rounded-sm flex items-center gap-1"
          // }
          className="text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 transition-ease rounded-sm flex items-center gap-1"
        >
          Home
        </NavLink>
      </aside>
      <aside>
        <NavLink
          to="/admin/create-bootcamp"
          className={({ isActive }) =>
            isActive
              ? "bg-orange-600 text-white py-2 px-3 rounded-sm flex items-center gap-1 "
              : "text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 transition-ease rounded-sm flex items-center gap-1"
          }
        >
          Create Bootcamp
        </NavLink>
      </aside>
      <aside>
        <NavLink
          to="/admin/bootcamps"
          className={({ isActive }) =>
            isActive
              ? "bg-orange-600 text-white py-2 px-3 rounded-sm flex items-center gap-1 "
              : "text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 transition-ease rounded-sm flex items-center gap-1"
          }
        >
          Bootcamps
        </NavLink>
      </aside>
    </article>
  );
};

export default AdminSidebar;
