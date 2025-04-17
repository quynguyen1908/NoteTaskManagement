import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
import { createNote } from "../../api/noteApi";
import { getUserInfo } from "../../api/authApi";

const CreateNote: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const email = localStorage.getItem("email");
            if (!email) {
                throw new Error("User email not found in local storage.");
            }
            const userInfo = await getUserInfo(email);
            await createNote(title, content, userInfo._id);
            navigate("/home/notes");
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };

    return (
        <div className="bg-white h-screen flex flex-col">
            <div className="grid grid-cols-[1fr_10fr] h-1/5 w-full">
                <NavLink to={"/home"} className={"flex items-center justify-center"}>
                    <RollbackOutlined className="text-8xl" />
                </NavLink>
                <div className="bg-gray-300 flex items-center justify-center font-bold text-4xl">
                    CREATE NOTE
                </div>
            </div>
            <form 
                className="flex flex-col items-center justify-center h-4/5 m-16"
                onSubmit={handleSubmit}    
            >
                <div className="w-full h-1/4 mb-4">
                    <input
                        placeholder="Title..."
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={50}
                        className="mt-1 block w-full h-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xl font-bold bg-gray-200"
                    />
                </div>
                <div className="w-full h-1/2 mb-4">
                    <textarea
                        placeholder="Content..."
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        maxLength={100}
                        className="mt-1 block w-full h-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xl font-bold"
                    />
                </div>
                <div className="w-full flex items-center justify-end">
                    <button type="submit" className="w-1/10 bg-blue-700 text-xl font-bold text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNote;