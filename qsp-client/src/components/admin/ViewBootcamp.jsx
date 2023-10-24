import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { oneBootcampService } from "../../services/authServices";

const ViewBootcamp = () => {
  let { id } = useParams();
  let [content, setContent] = useState({
    name: "",
    description: "",
    website: "",
    email: "",
    address: "",
    careers: [],
    averageRating: 0,
    averageCost: 0,
    housing: Boolean(true),
    jobAssistance: Boolean(false),
    jobGuarantee: Boolean(false),
  });

  let {
    name,
    description,
    website,
    email,
    address,
    careers,
    averageRating,
    averageCost,
    housing,
    jobAssistance,
    jobGuarantee,
  } = content;

  useEffect(() => {
    oneBootcampService(`/bootcamps/get-bootcamps/${id}`)
      .then(x => {
        setContent(x.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <section>
      <article className="w-[80%] mx-auto flex gap-2 border-2 border-slate-500 rounded-md p-4">
        <aside className="basis-3/4 flex flex-col gap-3 p-3 bg-slate-50">
          <h2 className="text-xl font-bold">{content.name}</h2>
          <p>{content.description}</p>
          <ul className="list-disc">
            <li>
              <span>Website:</span> <span>{content.website}</span>
            </li>
            <li>Email: {content.email}</li>
          </ul>
        </aside>
        <aside className="basis-1/4 flex flex-col justify-around items-center">
          <p className="text-xl font-bold">Ratings: {content.averageRating}</p>
          <p className="text-xl font-bold">Price: {content.averageCost}</p>
        </aside>
      </article>
    </section>
  );
};

export default ViewBootcamp;
