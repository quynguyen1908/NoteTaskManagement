import React, { useState } from "react";
import Login from "../components/Users/Login";
import Register from "../components/Users/Register";

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="bg-gray-100 w-full min-h-screen flex items-center rounded-lg justify-center">
            <div className="w-1/2 py-5 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
                <div className="flex p-3 gap-4">
                    <div 
                        className={`flex-1 duration-300 text-center cursor-pointer py-2 ${isLogin ? 'border-b-2 border-[#da2723] border-opacity-100 text-[#da2723]' : 'border-opacity-0 hover:border-opacity-100 text-gray-500 hover:text-[#da2723]'}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Đăng nhập
                    </div>
                    <div 
                        className={`flex-1 duration-300 text-center cursor-pointer py-2 ${!isLogin ? 'border-b-2 border-[#da2723] border-opacity-100 text-[#da2723]' : 'border-opacity-0 hover:border-opacity-100 text-gray-500 hover:text-[#da2723]'}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Đăng ký
                    </div>
                </div>
                {isLogin ? <Login /> : <Register />}
            </div>
        </div>
    );
};

export default AuthPage;