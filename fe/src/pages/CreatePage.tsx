import React from "react";
import { NavLink } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const CreatePage: React.FC = () => {
    return (
        <div className="grid grid-cols-2 w-full h-full px-20">
            <div className="flex items-center justify-center font-bold text-2xl">
                <NavLink to={"/create-note"} className={"flex flex-col items-center justify-center gap-8 group"}>
                    <PlusOutlined className="text-8xl group group-hover:scale-125 duration-300 transform"/>
                    Create a note
                </NavLink> 
            </div>
            <div className="flex items-center justify-center font-bold text-2xl">
                <NavLink to={"/create-task"} className={"flex flex-col items-center justify-center gap-8 group"}>
                    <PlusOutlined className="text-8xl group group-hover:scale-125 duration-300 transform"/>
                    Create a task
                </NavLink> 
            </div>
        </div>
    );
};

export default CreatePage;