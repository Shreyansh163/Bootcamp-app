import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../apis/AuthContext";
import Spinner from "../../helpers/Spinner";
import gravatarUrl from "gravatar-url";
import { getProfileService } from "../../services/authServices";
import { useParams } from "react-router-dom";

const ViewProfile = () => {
  let { getMe } = useContext(AuthContext);
  console.log(getMe);
  let users = getMe?.data;
  console.log(users);

  // console.log(user);

  let { id } = useParams();
  console.log(id);

  let [profile, setProfile] = useState({});

  useEffect(() => {
    let token = window.localStorage.getItem("user");
    let user = JSON.parse(token);
    getProfileService(`/profile/view/${id}`, `Bearer ${user?.token}`)
      .then(x => {
        console.log(x);
        setProfile(x);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(profile);

  return (
    <section className="bg-white h-[90.5vh] flex justify-center items-center">
      <article className="bg-orange-300 h-[90%] w-[50%] rounded-md p-3 text-white font-semibold">
        <header className="h-[20%]">
          <figure>
            <picture>
              <img src={profile?.data?.user?.photo[0]} alt="" />
            </picture>
          </figure>
        </header>
        <main>
          <aside className="flex flex-col items-center justify-around gap-2">
            <p className="bg-orange-800 py-2 px-3 w-[60%] rounded-lg drop-shadow-2xl flex">
              <span className="basis-1/2">FirstName:</span>
              <span className="basis-1/2 flex justify-center">
                {profile?.data?.firstname}
              </span>
            </p>
            <p className="bg-orange-800 py-2 px-3 w-[60%] rounded-lg flex">
              <span className="basis-1/2">LastName:</span>
              <span className="basis-1/2 flex justify-center">
                {profile?.data?.lastname}
              </span>
            </p>
            <p className="bg-orange-800 py-2 px-3 w-[60%] rounded-lg flex">
              <span className="basis-1/2">Date of Birth:</span>
              <span className="basis-1/2 flex justify-center">
                {profile?.data?.dob}
              </span>
            </p>
            <p className="bg-orange-800 py-2 px-3 w-[60%] rounded-lg flex">
              <span className="basis-1/2">Phone Number:</span>
              <span className="basis-1/2 flex justify-center">
                {profile?.data?.phone}
              </span>
            </p>
            <p className="bg-orange-800 py-2 px-3 w-[60%] rounded-lg flex">
              <span className="basis-1/2">Gender:</span>
              <span className="basis-1/2 flex justify-center">
                {profile?.data?.gender}
              </span>
            </p>
            <p className="bg-orange-800 py-2 px-3 w-[60%] rounded-lg flex">
              <span className="basis-1/2">City:</span>
              <span className="basis-1/2 flex justify-center">
                {profile?.data?.city}
              </span>
            </p>
            <p className="bg-orange-800 py-2 px-3 w-[60%] rounded-lg flex">
              <span className="basis-1/2">State:</span>
              <span className="basis-1/2 flex justify-center">
                {profile?.data?.state}
              </span>
            </p>
            <p className="bg-orange-800 py-2 px-3 w-[60%] rounded-lg flex">
              <span className="basis-1/2">Country:</span>
              <span className="basis-1/2 flex justify-center">
                {profile?.data?.country}
              </span>
            </p>
            <p className="bg-orange-800 py-2 px-3 w-[60%] rounded-lg flex">
              <span className="basis-1/2">Bio:</span>
              <span className="basis-1/2 flex justify-center">
                {profile?.data?.bio}
              </span>
            </p>
          </aside>
        </main>
        <footer></footer>
      </article>
    </section>
  );
};

export default ViewProfile;

// <div>
//   {getMe === null ? (
//     <Spinner />
//   ) : (
//     <article>
//       {/*<figure>
//             <picture>
//               <img src={gravatarUrl(users.email)} alt="" />
//             </picture>
//       </figure>*/}
//       <h1>{users.name}</h1>
//       <p>{users.email}</p>
//     </article>
//   )}
// </div>;
