import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="bg-white h-screen grid grid-cols-[1fr_10fr]">
        <div className="border border-gray-300 grid grid-cols-1 h-full font-bold text-2xl">
            <div className="flex items-center justify-center">
                <img src="/src/assets/favicon.png" alt="logo" className="w-2/3 h-auto -my-5" />
            </div>
            <NavLink to={"/"} className="hover:bg-gray-300 flex items-center justify-center">Home</NavLink>
            <NavLink to={"/"} className="hover:bg-gray-300 flex items-center justify-center">Notes</NavLink>
            <NavLink to={"/"} className="hover:bg-gray-300 flex items-center justify-center">Tasks</NavLink>
        </div>
        <div className="flex flex-col">
            <span className="font-bold text-4xl bg-gray-300 w-full h-1/5 flex justify-center items-center">Hello, welcome to your smart workspace!</span>
            <Outlet />
        </div>
    </div>
  );
};

export default Home;