import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo flex justify-start basis-1/5">
      <Link to="/">
        <span className="text-lg text-orange-500 hover:text-purple-600 font-bold tracking-wide pr-2 inline-block">
          QSPIDERS
        </span>
        <span className="text-xs bg-black text-white inline-block relative m-0 p-1.5 -top-0.5 ">Learning Platform</span>
      </Link>
    </div>
  );
};

export default Logo;
