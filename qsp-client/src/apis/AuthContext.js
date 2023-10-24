import { createContext, useEffect, useState } from "react";
import { ProfileService } from "../services/authServices";

export let AuthContext = createContext();

const AuthProvider = ({ children }) => {
  let [isAuth, isSetAuth] = useState(false);
  let [getMe, setGetMe] = useState(null);

  let TOKEN = window.localStorage.getItem("user");
  let USER = JSON.parse(TOKEN);

  useEffect(() => {
    if (!USER?.token) {
      console.log("Guest User");
      isSetAuth(false);
    } else {
      console.log("Authenticated User");
      ProfileService("/auth/me", `Bearer ${USER?.token}`)
        .then(user => {
          console.log(user);
          setGetMe(user);
        })
        .catch(err => console.log(err));
      isSetAuth(true);
    }
  }, [USER?.token]);

  let Signout = () => {
    window.localStorage.removeItem("user");
    window.location.assign("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuth, Signout, getMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
