import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { AuthContext } from './../../apis/AuthContext';

const ProfileSidebar = () => {
  let { getMe } = useContext(AuthContext);
  let users = getMe?.data;
  return (
    <article className="basis-1/5 border-t-[1px] drop-shadow-sm flex flex-col gap-3 p-2">
      <aside>
        <NavLink
          to="/profile"
          // className={({ isActive }) =>
          //   isActive
          //     ? "bg-orange-600 text-white py-2 px-3 rounded-sm flex items-center gap-1 "
          //     : "text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 transition-ease rounded-sm flex items-center gap-1"
          // }
          className="text-black no-underline py-2 px-3 hover:bg-slate-200 transition-ease rounded-sm flex items-center gap-1"
        >
          Home
        </NavLink>
      </aside>
      <aside>
        <NavLink
          to="/profile/create-profile"
          className={({ isActive }) =>
            isActive
              ? "bg-orange-600 text-white py-2 px-3 rounded-sm flex items-center gap-1 "
              : "text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 transition-ease rounded-sm flex items-center gap-1"
          }
        >
          Build Profile
        </NavLink>
      </aside>
      <aside>
        <NavLink
          to="/profile/view-profile/"
          className={({ isActive }) =>
            isActive
              ? "bg-orange-600 text-white py-2 px-3 rounded-sm flex items-center gap-1 "
              : "text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 transition-ease rounded-sm flex items-center gap-1"
          }
        >
          View Profile
        </NavLink>
      </aside>
    </article>
  );
}

export default ProfileSidebar