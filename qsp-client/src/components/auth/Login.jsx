import React, { useEffect, useState } from "react";
import SIGNIN_IMAGE from "../../asset/login-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { AuthService } from "../../services/authServices";

const Login = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    email: "",
    password: "",
  });

  let [isLoading, isSetLoading] = useState(false);
  let [btn, setBtn] = useState(false);
  let [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.email && state.password) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [state]);

  let togglePassword = () => {
    setShowPassword(!showPassword);
  };

  let { email, password } = state;

  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = e => {
    try {
      e.preventDefault();
      let payload = {
        email,
        password,
      };
      AuthService("auth/login", payload)
        .then(data => {
          // console.log(data);
          if (data.success === true) {
            window.localStorage.setItem("user", JSON.stringify(data));
            toast.success("Login Successfull");
            // navigate("/");
            window.location.assign("/profile");
            isSetLoading(true);
          } else {
            toast.error(data.response.statusText);
            navigate("/login");
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setState({
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
              <img
                src={SIGNIN_IMAGE}
                alt="signup"
                className="w-[300px] h-[300px]"
              />
            </picture>
          </figure>
        </aside>
        <aside className="bg-white flex p-3 basis-2/3 flex-col gap-3">
          <h1 className="font-bold text-orange-500 text-xl">Login</h1>
          <main>
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
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
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <span onClick={togglePassword} className="relative">
                    <b className="absolute top-1 right-1 h-[30px] w-[30px] text-lg">
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </b>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className={
                      btn
                        ? "disabled cursor-not-allowed focus:outline-none opacity-30 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline"
                        : "bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-100"
                    }
                  >
                    {isLoading === true ? (
                      "loading..."
                    ) : (
                      <span disabled={btn ? true : false}>Login</span>
                    )}
                  </button>
                  <p>Don't have account create a new account</p>
                  <Link
                    className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
                    to="/signup"
                  >
                    Register
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

export default Login;

// <div className="flex items-center justify-between">
//   <button
//     className={
//       btn
//         ? "disabled cursor-not-allowed focus:outline-none opacity-30 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         : "bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-100"
//     }
//   >
//     {isLoading === true ? (
//       "loading..."
//     ) : (
//       <span disabled={btn ? true : false}>Login</span>
//     )}
//   </button>
//   <p>Don't have account create a new account</p>
//   <Link
//     className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
//     to="/signup"
//   >
//     Register
//   </Link>
// </div>;
