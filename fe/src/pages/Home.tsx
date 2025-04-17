import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/");
    };

    return (
        <div className="bg-white h-screen grid grid-cols-[1fr_10fr]">
            <div className="border border-gray-300 grid grid-cols-1 h-full font-bold text-2xl">
                <div className="flex items-center justify-center">
                    <button className="bg-red-500 p-2 rounded-lg flex items-center justify-center text-white cursor-pointer" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
                <div className="row-span-4 flex items-center justify-center">
                    <img src="/src/assets/favicon.png" alt="logo" className="w-2/3 h-auto -my-5" />
                </div>
                <NavLink
                    to="/home"
                    end
                    className={({ isActive }) =>
                        isActive ? "row-span-4 bg-gray-300 flex items-center justify-center" : "row-span-4 hover:bg-gray-300 flex items-center justify-center"
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/home/notes"
                    className={({ isActive }) =>
                        isActive ? "row-span-4 bg-gray-300 flex items-center justify-center" : "row-span-4 hover:bg-gray-300 flex items-center justify-center"
                    }
                >
                    Notes
                </NavLink>
                <NavLink
                    to="/home/tasks"
                    className={({ isActive }) =>
                        isActive ? "row-span-4 bg-gray-300 flex items-center justify-center" : "row-span-4 hover:bg-gray-300 flex items-center justify-center"
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