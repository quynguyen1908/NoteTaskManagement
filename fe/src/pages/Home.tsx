import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="bg-white h-screen grid grid-cols-[1fr_10fr]">
            <div className="border border-gray-300 grid grid-cols-1 h-full font-bold text-2xl">
                <div className="flex items-center justify-center">
                    <img src="/src/assets/favicon.png" alt="logo" className="w-2/3 h-auto -my-5" />
                </div>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "bg-gray-300 flex items-center justify-center" : "hover:bg-gray-300 flex items-center justify-center"
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/notes"
                    className={({ isActive }) =>
                        isActive ? "bg-gray-300 flex items-center justify-center" : "hover:bg-gray-300 flex items-center justify-center"
                    }
                >
                    Notes
                </NavLink>
                <NavLink
                    to="/tasks"
                    className={({ isActive }) =>
                        isActive ? "bg-gray-300 flex items-center justify-center" : "hover:bg-gray-300 flex items-center justify-center"
                    }
                >
                    Tasks
                </NavLink>
            </div>
            <div className="bg-white flex flex-col overflow-x-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;