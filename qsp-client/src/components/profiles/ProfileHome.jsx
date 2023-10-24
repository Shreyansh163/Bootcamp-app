import React, { useContext } from "react";
import { AuthContext } from "../../apis/AuthContext";
import gravatarUrl from "gravatar-url";
import { Link, NavLink } from "react-router-dom";

const ProfileHome = () => {
  let { getMe } = useContext(AuthContext);
  let users = getMe?.data;
  console.log(users);
  return (
    <section className="h-[90.5vh] py-3 flex items-center ">
      <article className="w-[80%] h-[85vh] mx-auto flex drop-shadow-md">
        <aside className="basis-2/5 flex flex-col gap-4 items-center justify-center bg-white">
          <figure>
            <picture>
              {/*<img
                src={gravatarUrl(users.email)}
                alt=""
                className="w-[200px] h-[200px] rounded-full"
  />*/}
              <img src={users?.photo[0]} alt="pic" />
            </picture>
          </figure>
          <Link
            to="/profile/upload-photo"
            className="px-3 py-1 bg-green-500 rounded-sm"
          >
            Upload Photo
          </Link>
          <h1 className="text-xl font-bold">{users?.name}</h1>
          <p>{users?.email}</p>
          <div>
            <NavLink
              to={`/profile/update-profile/${users?.id}`}
              className="px-3 py-2 bg-blue-600 text-white font-sans rounded-sm"
            >
              Update Profile
            </NavLink>
          </div>
        </aside>
        <aside
          className="basis-3/5 text-xl font-semibold flex flex-col gap-4 items-center justify-center bg-[#efefef]
        "
        >
          <h3 className="w-[80%]">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos animi
            maxime culpa maiores modi asperiores, ipsum quia quis repellendus
            suscipit? Accusamus maxime reprehenderit optio, vel veritatis
            incidunt explicabo a? Quod molestias incidunt consequatur
            repudiandae libero excepturi error quia est dignissimos, magnam
            tenetur quae veritatis, provident repellendus eos expedita ipsa
            commodi?"
          </h3>
        </aside>
      </article>
    </section>
  );
};

export default ProfileHome;
