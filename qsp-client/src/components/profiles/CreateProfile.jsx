import React, { useContext, useState } from "react";
import {
  createProfileService,
  uploadPhotoService,
} from "../../services/authServices";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../apis/AuthContext";

const CreateProfile = () => {
  let [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    dob: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    bio: "",
  });

  let { getMe } = useContext(AuthContext);
  let users = getMe?.data;

  // let [photo, setPhoto] = useState(null);

  let navigate = useNavigate();
  let { firstname, lastname, phone, dob, gender, city, state, country, bio } =
    profile;

  let handleChange = e => {
    let { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    console.log(profile);
  };

  // let handlePhoto = e => {
  //   setPhoto(e.target.files[0]);
  //   console.log(e.target.files[0]);
  // };

  let handleSubmit = e => {
    e.preventDefault();
    try {
      let payload = {
        firstname,
        lastname,
        phone,
        dob,
        gender,
        city,
        state,
        country,
        bio,
      };
      let user = JSON.parse(window.localStorage.getItem("user"));
      console.log(user.token);
      createProfileService("/profile", payload, `Bearer ${user?.token}`)
        .then(data => {
          console.log(data);
        })
        .catch(err => console.log(err));
      // let photoPayload = photo;
      // uploadPhotoService(`/auth/uploaduserphoto/${user.id}`, photoPayload);
      toast.success("succesfully Profile created");
      navigate(`/profile/view-profile/${users._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setProfile({
        firstname: "",
        lastname: "",
        phone: "",
        dob: "",
        gender: "",
        city: "",
        state: "",
        country: "",
        bio: "",
      });
    }
  };

  return (
    <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                My account
              </h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="firstname"
                      value={firstname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="lastname"
                      value={lastname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="dob"
                      value={dob}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div
                    className="relative w-full mb-3"
                    value={dob}
                    onChange={handleChange}
                  >
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      Gender
                    </label>
                    <input
                      type="radio"
                      className="border-0 px-3 py-3 mr-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                      name="gender"
                      value="male"
                      onChange={handleChange}
                    />
                    Male
                    <input
                      type="radio"
                      className="border-0 px-3 py-3 mr-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                      name="gender"
                      value="female"
                    />
                    Female
                  </div>
                </div>
              </div>
              {/*<div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="photo"
                    onChange={handlePhoto}
                  />
                </div>
  </div>*/}
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Contact Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="city"
                      value={city}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="state"
                      value={state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="country"
                      value={country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                About Me
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      About me
                    </label>
                    <textarea
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      rows={4}
                      name="bio"
                      value={bio}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProfile;

// <article className='py-2 h-[90.5vh] flex items-center'>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[50%] mx-auto border-2 border-slate-500 rounded-md p-3">
//           <div>
//             <label htmlFor="fname">First Name:</label>
//             <input
//               type="text"
//               name="fname"
//               value={firstname}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="lname">Last Name:</label>
//             <input
//               type="text"
//               name="lname"
//               value={lastname}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="phone">Phone:</label>
//             <input
//               type="tel"
//               name="phone"
//               value={phone}
//               onChange={handleChange}
//             />
//           </div>
//           <div value={gender} onChange={handleChange}>
//             <label htmlFor="gen">Gender:</label>
//             <input type="radio" name="gen" value="male" />
//             Male
//             <input type="radio" name="gen" value="male" />
//             Male
//           </div>
//           <div>
//             <label htmlFor="city">City:</label>
//             <input
//               type="text"
//               name="city"
//               value={city}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="">Country:</label>
//             <input
//               type="text"
//               name="country"
//               value={country}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="bio">Bio:</label>
//             <textarea
//               name="bio"
//               id="bio"
//               cols="30"
//               rows="10"
//               value={bio}
//               onChange={handleChange}
//             ></textarea>
//           </div>
//           <div>
//             <label htmlFor="">Country:</label>
//             <input
//               type="text"
//               name="country"
//               value={country}
//               onChange={handleChange}
//             />
//           </div>
//         </form>
//       </article>
