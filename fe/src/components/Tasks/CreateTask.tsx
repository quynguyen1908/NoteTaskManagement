import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RollbackOutlined, CalendarOutlined } from "@ant-design/icons";
import { createTask } from "../../api/taskApi";
import { DatePicker } from "antd";
import dayjs from 'dayjs';

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [place, setPlace] = useState("");
  const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        await createTask(
            title,
            description,
            place,
            beginDate ? dayjs(beginDate).format('YYYY-MM-DD') : '',
            endDate ? dayjs(endDate).format('YYYY-MM-DD') : ''
        );
        navigate("/tasks");
        } catch (error) {
        console.error("Error creating task:", error);
        }
    };

  return (
    <div className="bg-white h-screen flex flex-col">
      <div className="grid grid-cols-[1fr_10fr] h-1/5 w-full">
        <NavLink to={"/"} className={"flex items-center justify-center"}>
          <RollbackOutlined className="text-8xl" />
        </NavLink>
        <div className="bg-gray-300 flex items-center justify-center font-bold text-4xl">
          CREATE TASK
        </div>
      </div>
      <form className="flex h-4/5 m-16" onSubmit={handleSubmit}>
        {/* Container bên trái cho title và description */}
        <div className="w-5/9 pr-8">
          <div className="w-full mb-4">
            <input
              placeholder="Title..."
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xl font-bold bg-gray-200"
            />
          </div>
          <div className="w-full h-96">
            <textarea
              placeholder="description..."
              id="description"
              name="description"
              required
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              maxLength={100}
              className="mt-1 block w-full h-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xl font-bold"
            />
          </div>
        </div>

       
        <div className="w-4/9 flex flex-col items-center justify-start pt-4">
          <button
            type="submit"
            className="absolute bottom-4 right-4 bg-blue-700 text-xl font-bold text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
          >
            Save
          </button>

          <div className="flex items-center mb-4 space-x-4">

            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-center">
                <CalendarOutlined className="text-8xl" />
                <span className="text-xl font-bold">Begin</span> 
              </div>
              <DatePicker
                onChange={(date) => setBeginDate(date)}
                value={beginDate}
                placeholder="Begin Date"
              />
            </div>

            {/* End Day */}
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-center">
                <CalendarOutlined className="text-8xl" />
                <span className="text-xl font-bold">End</span> 
              </div>
              <DatePicker
                onChange={(date) => setEndDate(date)}
                value={endDate}
                placeholder="End Date"
              />
            </div>
          </div>

    
           <div className="w-full h-60">
            <textarea  
              placeholder="Place..."
              id="place"
              name="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="mt-1 block w-full h-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xl font-bold"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreateTask;