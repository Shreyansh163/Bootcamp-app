import React, { useEffect, useState } from "react";
import SIGNUP_IMAGE from "../../asset/images-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { AuthService } from "../../services/authServices";

const Signup = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  let [isLoading, isSetLoading] = useState(false);
  let [btn, setBtn] = useState(false);

  useEffect(() => {
    if (state.name && state.email && state.password) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [state]);

  let { name, email, password } = state;

  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = e => {
    try {
      e.preventDefault();
      let payload = {
        name,
        email,
        password,
      };
      AuthService("auth/register", payload)
        .then(data => {
          console.log(data);
          if (data.success === true) {
            toast.success("User Successfully Registered");
            navigate("/login");
            isSetLoading(true);
          } else {
            toast.error(data.response.statusText);
            navigate("/signup");
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setState({
        name: "",
        email: "",
        password: "",
      });
      isSetLoading(false);
    }
  };

  return (
    <section className="auth bg-white h-[80vh] mx-auto w-[70%] mt-10">
      <article className="flex bg-slate-400 h-[80vh]">
        <aside className="bg-orange-200 flex p-3 basis-1/3 justify-center items-center">
          <figure>
            <picture>
              <img src={SIGNUP_IMAGE} alt="signup" className="w-[300px]" />
            </picture>
          </figure>
        </aside>
        <aside className="bg-white flex p-3 basis-2/3 flex-col gap-3">
          <h1 className="font-bold text-orange-500 text-xl">Register</h1>
          <main>
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="name"
                    type="text"
                    placeholder="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                    id="email"
                    type="email"
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                    id="password"
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className={
                      btn
                        ? "disabled cursor-not-allowed focus:outline-none opacity-30 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        : "bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-100"
                    }
                  >
                    {isLoading === true ? (
                      "loading..."
                    ) : (
                      <span disabled={btn ? true : false}>Register</span>
                    )}
                  </button>
                  <Link
                    className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
                    to="/login"
                  >
                    Go to Login
                  </Link>
                </div>
              </div>
            </form>
          </main>
        </aside>
      </article>
    </section>
  );
};

export default Signup;
