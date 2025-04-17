import React, { useState } from "react";
import { register } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const validateForm = (email: string, password: string, confirmPassword: string) => {
        return email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setIsButtonDisabled(!validateForm(email, password, e.target.value));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setIsButtonDisabled(!validateForm(email, password, e.target.value));
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setIsButtonDisabled(!validateForm(email, password, e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp.");
            return;
        }
        try {
            await register(email, password);
            navigate("/home");
        } catch (err) {
            setError("Đăng ký thất bại. Vui lòng thử lại.");
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
            <label className="ml-2 mt-2 text-gray-600">Xác nhận mật khẩu</label>
            <input 
                type="password" 
                placeholder="Nhập lại mật khẩu" 
                className="p-2 m-2 border-2 border-gray-300 rounded-md" 
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />
            <div className="flex justify-center">
                <button 
                    className={`p-2 m-8 w-1/2 bg-[#da2723] text-white font-bold rounded-lg ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={isButtonDisabled}
                >
                    Đăng ký
                </button>
            </div>
            {error &&
                <div className="flex justify-center">
                    <div className="p-2 m-2 w-1/2 text-[#da2723] text-center text-md">{error}</div>
                </div>
            }
        </form>
    );
};

export default Register;