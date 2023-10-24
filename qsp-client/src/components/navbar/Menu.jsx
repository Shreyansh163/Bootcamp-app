import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsFillBootstrapFill } from "react-icons/bs";
import { AuthContext } from "./../../apis/AuthContext";
import gravatarUrl from "gravatar-url";

const Menu = () => {
  let { isAuth, Signout, getMe } = useContext(AuthContext);
  let users = getMe?.data;
  let IsAnonymousUser = () => {
    return (
      <>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "bg-orange-600 text-white py-2 px-3 rounded-sm flex items-center gap-1"
                : "text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 rounded-sm flex items-center gap-1"
            }
          >
            <span className="block">
              <AiOutlineLogin />
            </span>
            <span className="block">Login</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? "bg-orange-600 text-white py-2 px-3 rounded-sm flex items-center gap-1"
                : "text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 rounded-sm flex items-center gap-1"
            }
          >
            <span className="block">
              <SiGnuprivacyguard />
            </span>
            <span className="block">Signup</span>
          </NavLink>
        </li>
      </>
    );
  };

  let IsAuthenticatedUser = () => {
    return (
      <>
        <li>
          <NavLink
            to="/bootcamps"
            className={({ isActive }) =>
              isActive
                ? "bg-orange-600 text-white py-2 px-3 rounded-sm flex items-center gap-1 "
                : "text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 transition-ease rounded-sm flex items-center gap-1"
            }
          >
            <span className="block">
              <BsFillBootstrapFill />
            </span>
            <span className="block">Bootcamps</span>
          </NavLink>
        </li>
        <li>
          <button
            onClick={Signout}
            className="text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 rounded-sm flex items-center gap-1"
          >
            <span className="block">
              <AiOutlineLogout />
            </span>
            <span className="block">Logout</span>
          </button>
        </li>
        <li>
          <NavLink
            to="/profile"
            className="text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 rounded-sm flex items-center gap-1"
          >
            <span className="block">
              <figure>
                <picture>
                  {users?.email === undefined ? (
                    <AiOutlineUser />
                  ) : (
                    <img
                      src={gravatarUrl(users?.email)}
                      alt={users?.name}
                      className="w-[35px] h-[35px] mx-1 my-0 border-2 border-orange-500 rounded-[50%]"
                    />
                  )}
                </picture>
              </figure>
            </span>
            <span className="block">
              <strong className="text-slate-500 hover:text-slate-600 capitalize font-semibold">
                {users?.name}
              </strong>
            </span>
          </NavLink>
        </li>
      </>
    );
  };

  let IsAdmin = () => {
    return (
      <li>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive
              ? "bg-orange-600 text-white py-2 px-3 rounded-sm flex items-center gap-1 "
              : "text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 transition-ease rounded-sm flex items-center gap-1"
          }
        >
          <span className="block">
            <MdAdminPanelSettings />
          </span>
          <span className="block">Admin</span>
        </NavLink>
      </li>
    );
  };

  return (
    <div className="flex justify-end basis-4/5">
      <ul className="flex items-center">
        {users?.role === "admin" ? <IsAdmin /> : ""}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-orange-600 text-white py-2 px-3 rounded-sm flex items-center gap-1 "
                : "text-slate-900 no-underline py-2 px-3 hover:bg-slate-200 transition-ease rounded-sm flex items-center gap-1"
            }
          >
            <span className="block">
              <AiOutlineHome />
            </span>
            <span className="block">Home</span>
          </NavLink>
        </li>
        {isAuth === true ? <IsAuthenticatedUser /> : <IsAnonymousUser />}
      </ul>
    </div>
  );
};

export default Menu;
