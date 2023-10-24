import React, { useContext, useEffect, useState } from "react";
import {
  deleteBootcampService,
  fetchBootcampsService,
} from "../../services/authServices";
import { AuthContext } from "./../../apis/AuthContext";
import { Link } from "react-router-dom";

const Bootcamp = () => {
  let [bootcamps, setBootcamps] = useState([]);
  let { getMe, isAuth } = useContext(AuthContext);
  // console.log(getMe);
  // console.log(isAuth);

  let token = window.localStorage.getItem("user");
  let user = JSON.parse(token);

  useEffect(() => {
    fetchBootcampsService("/bootcamps/get-bootcamps")
      .then(x => {
        setBootcamps(x.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  let AdminBootcamp = () => {
    let deleteBootcamp = id => {
      deleteBootcampService(
        `/bootcamps/get-bootcamps/${id}`,
        `Bearer ${user?.token}`
      );
      window.location.assign("/admin/bootcamps");
    };

    return (
      <section className="flex flex-col gap-5 py-5">
        {bootcamps?.map(data => {
          console.log(data.id);
          return (
            <>
              <article
                className="w-[80%] mx-auto flex gap-2 border-2 border-slate-500 rounded-md p-4"
                key={data.id}
              >
                <aside className="basis-3/4 flex flex-col gap-3 p-3 bg-slate-50">
                  <h2 className="text-xl font-bold">{data.name}</h2>
                  <p>{data.description}</p>
                  <ul className="list-disc">
                    <li>
                      <span>Website:</span> <span>{data.website}</span>
                    </li>
                    <li>Email: {data.email}</li>
                  </ul>
                </aside>
                <aside className="basis-1/4 flex flex-col justify-around items-center">
                  <p className="text-xl font-bold">
                    Ratings: {data.averageRating}
                  </p>
                  <p className="text-xl font-bold">Price: {data.averageCost}</p>
                  <div className="flex gap-1">
                    <div className="basis-1/3">
                      <Link
                        to={`/admin/view-bootcamp/${data.id}`}
                        className="inline-block w-[100%] px-3 py-2 bg-green-800 text-white rounded-sm"
                      >
                        View
                      </Link>
                    </div>
                    <div className="basis-1/3">
                      <Link
                        to={`/admin/update-bootcamp/${data.id}`}
                        className="inline-block w-[100%] px-3 py-2 bg-green-800 text-white rounded-sm"
                      >
                        Update
                      </Link>
                    </div>
                    <div className="basis-1/3">
                      <button
                        onClick={() => deleteBootcamp(data.id)}
                        className="inline-block w-[100%] px-3 py-2 bg-red-800 text-white rounded-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </aside>
              </article>
            </>
          );
        })}
      </section>
    );
  };

  let Bootcamp = () => {
    return (
      <section className="flex flex-col gap-5 py-5">
        {bootcamps?.map(data => {
          return (
            <>
              <article className="w-[80%] mx-auto flex gap-2 border-2 border-slate-500 rounded-md p-4">
                <aside className="basis-3/4 flex flex-col gap-3 p-3 bg-slate-50">
                  <h2 className="text-xl font-bold">{data.name}</h2>
                  <p>{data.description}</p>
                  <ul className="list-disc">
                    <li>
                      <span>Website:</span> <span>{data.website}</span>
                    </li>
                    <li>Email: {data.email}</li>
                  </ul>
                </aside>
                <aside className="basis-1/4 flex flex-col justify-around items-center">
                  <p className="text-xl font-bold">
                    Ratings: {data.averageRating}
                  </p>
                  <p className="text-xl font-bold">Price: {data.averageCost}</p>
                  <div>
                    <Link
                      to={`/view-bootcamp/${data.id}`}
                      className="px-3 py-2 bg-green-800 text-white rounded-sm mr-1"
                    >
                      View More
                    </Link>
                  </div>
                </aside>
              </article>
            </>
          );
        })}
      </section>
    );
  };

  return (
    <>{getMe?.data?.role === "admin" ? <AdminBootcamp /> : <Bootcamp />}</>
  );
};

export default Bootcamp;
