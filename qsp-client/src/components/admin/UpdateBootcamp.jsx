import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  AuthService,
  CourseService,
  oneBootcampService,
  updateBootcampService,
} from "../../services/authServices";
import { AuthContext } from "./../../apis/AuthContext";

const UpdateBootcamp = () => {
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

  let { id } = useParams();
  console.log(id);
  let navigate = useNavigate();

  let { getMe, isAuth } = useContext(AuthContext);

  useEffect(() => {
    oneBootcampService(`/bootcamps/get-bootcamps/${id}`)
      .then(x => {
        setContent(x.data);
      })
      .catch(err => console.log(err));
  }, [id]);

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

  let handleChange = e => {
    let { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  let handleCareers = e => {
    let { name, value } = e.target;
    setContent({ ...content, careers: [...careers, value] });
  };
  let handleSubmit = e => {
    e.preventDefault();
    try {
      let payload = {
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
      };
      let user = JSON.parse(window.localStorage.getItem("user"));
      console.log(user.token);
      console.log(payload);
      updateBootcampService(
        `/bootcamps/get-bootcamps/${id}`,
        payload,
        `Bearer ${user?.token}`
      )
        .then(data => {
          console.log(data);
          if (data.success) {
            toast.success("succesfully bootcamp updated");
            navigate("/admin/bootcamps");
            // setLoading(true);
          } else {
            toast.error(data.response.statusText);
            navigate("/profile");
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setContent({
        name: "",
        description: "",
        website: "",
        email: "",
        address: "",
        careers: [],
        averageRating: parseInt(0),
        averageCost: parseInt(0),
        housing: Boolean(true),
        jobAssistance: Boolean(false),
        jobGuarantee: Boolean(false),
      });
    }
  };

  let handleClear = () => {
    setContent({
      name: "",
      description: "",
      website: "",
      email: "",
      address: "",
      careers: [],
      averageRating: parseInt(0),
      averageCost: parseInt(0),
      housing: Boolean(true),
      jobAssistance: Boolean(false),
      jobGuarantee: Boolean(false),
    });
  };

  return (
    <aside className="bg-slate-100 basis-4/5 overflow-y-scroll">
      <section className=" py-1 bg-slate-50 ">
        <div className="w-[100%] mx-auto px-3 mt-3">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-center">
                <h6 className="text-orange-700 text-xl font-bold">
                  Update BootCamp
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                <hr className="text-orange-700" />
                <div className="flex flex-wrap mt-4">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="name"
                      >
                        BootCamp Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300  bg-white rounded text-sm shadow focus:outline-none focus:outline-orange-400 w-full ease-linear transition-all duration-150"
                        placeholder="Enter BootCamp Name"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="email"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-300  bg-white rounded text-sm shadow focus:outline-none focus:outline-orange-400 w-full ease-linear transition-all duration-150"
                        id="name"
                        placeholder="Enter BootCamp Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="website"
                      >
                        Website
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300  bg-white rounded text-sm shadow focus:outline-none focus:outline-orange-400 w-full ease-linear transition-all duration-150"
                        id="website"
                        placeholder="Enter the Website"
                        name="website"
                        value={website}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/*  */}

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="address"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300  bg-white rounded text-sm shadow focus:outline-none focus:outline-orange-400 w-full ease-linear transition-all duration-150"
                        placeholder="Enter The Address"
                        name="address"
                        value={address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="rating"
                      >
                        Average Rating
                      </label>
                      <div className="flex gap-10 bg-white h-[45px] rounded-md justify-start items-center px-[15px] shadow text-xs">
                        <aside className="flex gap-3 capitalize font-semibold">
                          <input
                            type="radio"
                            name="averageRating"
                            value={1}
                            onChange={handleChange}
                          />
                          <span>one</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold">
                          <input
                            type="radio"
                            name="averageRating"
                            value={2}
                            onChange={handleChange}
                          />
                          <span>two</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold">
                          <input
                            type="radio"
                            name="averageRating"
                            value={3}
                            onChange={handleChange}
                          />
                          <span>three</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold">
                          <input
                            type="radio"
                            name="averageRating"
                            value={4}
                            onChange={handleChange}
                          />
                          <span>four</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold">
                          <input
                            type="radio"
                            name="averageRating"
                            value={5}
                            onChange={handleChange}
                          />
                          <span>five</span>
                        </aside>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="cost"
                      >
                        Average Cost
                      </label>
                      <input
                        type="tel"
                        className="border-0 px-3 py-3 placeholder-gray-300  bg-white rounded text-sm shadow focus:outline-none focus:outline-orange-400 w-full ease-linear transition-all duration-150"
                        placeholder="10000 rs"
                        id="cost"
                        name="averageCost"
                        value={averageCost}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="rating"
                      >
                        career options
                      </label>
                      <div className="flex gap-10 bg-white h-[auto] rounded-md justify-start items-center p-[15px] shadow flex-wrap text-[13px]">
                        <aside className="flex gap-3 capitalize font-semibold w-[200px]">
                          <input
                            type="checkbox"
                            name="careers"
                            value="web development"
                            onChange={handleCareers}
                          />
                          <span>web development</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold w-[200px]">
                          <input
                            type="checkbox"
                            name="careers"
                            value="react development"
                            onChange={handleCareers}
                          />
                          <span>react development</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold w-[200px]">
                          <input
                            type="checkbox"
                            name="careers"
                            value="fullstack development"
                            onChange={handleCareers}
                          />
                          <span>fullstack development</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold w-[200px]">
                          <input
                            type="checkbox"
                            name="careers"
                            value="java development"
                            onChange={handleCareers}
                          />
                          <span>java development</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold w-[200px]">
                          <input
                            type="checkbox"
                            name="careers"
                            value="python development"
                            onChange={handleCareers}
                          />
                          <span>python development</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold w-[200px]">
                          <input
                            onChange={handleCareers}
                            type="checkbox"
                            name="careers"
                            value="android development"
                          />
                          <span>android development</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold w-[200px]">
                          <input
                            onChange={handleCareers}
                            type="checkbox"
                            name="careers"
                            value="ux/ui development"
                          />
                          <span>ux/ui development</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold w-[200px]">
                          <input
                            onChange={handleCareers}
                            type="checkbox"
                            name="careers"
                            value="business"
                          />
                          <span>business</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold w-[200px]">
                          <input
                            onChange={handleCareers}
                            type="checkbox"
                            name="careers"
                            value="others"
                          />
                          <span>others</span>
                        </aside>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="housing"
                      >
                        Housing Available
                      </label>
                      <div className="flex gap-10 bg-white h-[45px] rounded-md justify-start items-center px-[15px] shadow text-xs">
                        <aside className="flex gap-3 capitalize font-semibold">
                          <input
                            onChange={handleChange}
                            type="radio"
                            name="housing"
                            value={true}
                          />
                          <span>Available</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold">
                          <input
                            onChange={handleChange}
                            type="radio"
                            name="housing"
                            value={false}
                          />
                          <span>not Available</span>
                        </aside>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="housing"
                      >
                        job assistence Available
                      </label>
                      <div className="flex gap-10 bg-white h-[45px] rounded-md justify-start items-center px-[15px] shadow text-xs">
                        <aside className="flex gap-3 capitalize font-semibold">
                          <input
                            onChange={handleChange}
                            type="radio"
                            name="jobAssistance"
                            value={true}
                          />
                          <span>Available</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold">
                          <input
                            onChange={handleChange}
                            type="radio"
                            name="jobAssistance"
                            value={false}
                          />
                          <span>not Available</span>
                        </aside>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="jobG"
                      >
                        job gaurentee Available
                      </label>
                      <div className="flex gap-10 bg-white h-[45px] rounded-md justify-start items-center px-[15px] shadow text-xs">
                        <aside className="flex gap-3 capitalize font-semibold">
                          <input
                            onChange={handleChange}
                            type="radio"
                            name="jobGuarantee"
                            value={true}
                          />
                          <span>Available</span>
                        </aside>
                        <aside className="flex gap-3 capitalize font-semibold">
                          <input
                            onChange={handleChange}
                            type="radio"
                            name="jobGuarantee"
                            value={false}
                          />
                          <span>not Available</span>
                        </aside>
                      </div>
                    </div>
                  </div>
                </div>

                <h6 className="text-orange-700 text-sm mt-3 mb-6 font-bold uppercase">
                  description
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="description"
                      >
                        About BootCamp
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300  bg-white rounded text-sm shadow focus:outline-none focus:outline-orange-400 w-full ease-linear transition-all duration-150"
                        rows={4}
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-orange-700 text-xs font-bold mb-2"
                        htmlfor="photo"
                      >
                        photos
                      </label>
                      <input
                        onChange={handleChange}
                        type="file"
                        accept="png, jpg, jpeg, avi"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mt-5">
                    <div className="relative w-full mb-3">
                      <button
                        className=" bg-orange-500 h-[45px] rounded-md px-[15px] w-full text-white font-bold hover:bg-orange-600 transition ease-linear"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mt-5">
                    <div className="relative w-full mb-3">
                      <button
                        className=" bg-orange-500 h-[45px] rounded-md px-[15px] w-full text-white font-bold hover:bg-orange-600 transition ease-linear"
                        type="reset"
                        onClick={handleClear}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default UpdateBootcamp;
