import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setIsButtonDisabled(e.target.value === "" || password === "");
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setIsButtonDisabled(email === "" || e.target.value === "");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/home");
        } catch (error) {
            setErrorMessage("Email hoặc Mật khẩu sai!");
        }
    };

    return (
        <form className="flex flex-col p-5" onSubmit={handleSubmit}>
            <label className="ml-2 text-gray-600">Email</label>
            <input 
                type="email" 
                placeholder="Nhập email" 
                className="p-2 m-2 border-2 border-gray-300 rounded-md" 
                value={email}
                onChange={handleEmailChange}
            />
            <label className="ml-2 mt-2 text-gray-600">Mật khẩu</label>
            <input 
                type="password" 
                placeholder="Nhập mật khẩu" 
                className="p-2 m-2 border-2 border-gray-300 rounded-md" 
                value={password}
                onChange={handlePasswordChange}
            />
            <div className="text-right p-2 m-2 text-[#da2723]"><span className="cursor-pointer">Quên mật khẩu?</span></div>
            <div className="flex justify-center">
                <button 
                    className={`p-2 m-2 w-1/2 bg-[#da2723] text-white font-bold rounded-lg ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={isButtonDisabled}
                >
                    Đăng nhập
                </button>
            </div>
            {errorMessage &&
                <div className="flex justify-center">
                    <div className="p-2 m-2 w-1/2 text-[#da2723] text-center text-md">{errorMessage}</div>
                </div>
            }
        </form>
    );
};

export default Login;