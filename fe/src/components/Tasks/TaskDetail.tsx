import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { CalendarOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Task } from "../../types/Task";
import { deleteTask, getTaskById, updateTask } from "../../api/taskApi";

const TaskDetail: React.FC = () => {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [beginDate, setBeginDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [status, setStatus] = useState<string>("pending");
  const [place, setPlace] = useState<string>("");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (id) {
          const task = await getTaskById(id);
          setTask(task);
          setTitle(task.title);
          setDescription(task.description);
          setPlace(task.place);
          setStatus(task.status);
          setBeginDate(task.beginDate ? dayjs(task.beginDate) : null);
          setEndDate(task.endDate ? dayjs(task.endDate) : null);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
      setLoading(false);
    };

    fetchTask();
  }, [id]);

  useEffect(() => {
    if (task) {
      setIsChanged(
        title !== task.title ||
        description !== task.description ||
        place !== task.place ||
        (beginDate && !beginDate.isSame(task.beginDate)) ||
        (endDate && !endDate.isSame(task.endDate)) ||
        status !== task.status
      );
    }
  }, [title, description, place, beginDate, endDate, status, task]);

  const handleSave = async () => {
    if (id && task) {
      try {
        await updateTask(id, title, description, place, beginDate ? beginDate.toISOString() : "", endDate ? endDate.toISOString() : "", status);
        navigate("/tasks");
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteTask(id);
        navigate("/tasks");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white h-screen flex flex-col">
      <div className="font-bold text-4xl bg-gray-300 w-full h-1/5 flex justify-center items-center">
        <input
          placeholder="Title"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
          className="h-20 w-full text-center"
        />
      </div>
      <form className="flex h-4/5 m-16">
        <div className="w-5/9 pr-8">
          <div className="w-full h-120">
            <textarea
              required
              placeholder="Description..."
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
              className="mt-1 block w-full h-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xl font-bold"
            />
          </div>
        </div>

        <div className="w-4/9 flex flex-col items-center justify-start pt-4">
          <div className="flex space-x-4 absolute bottom-4 right-4">
            <button
              type="button"
              onClick={openModal}
              className="bg-red-700 text-xl font-bold text-white py-2 px-4 rounded-md hover:bg-red-500"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isChanged}
              className={`text-xl font-bold text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                isChanged ? "bg-blue-700 hover:bg-blue-500 cursor-pointer" : "bg-blue-300 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>

          <div className="flex items-center mb-4 space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-center">
              <CalendarOutlined className="text-8xl" />
              <span className="text-xl font-bold">Begin</span>
              </div>
              <DatePicker onChange={(date) => setBeginDate(date)} value={beginDate} placeholder="Begin Date" />
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-center">
                <CalendarOutlined className="text-8xl" />
                <span className="text-xl font-bold">End</span>
              </div>
              <DatePicker onChange={(date) => setEndDate(date)} value={endDate} placeholder="End Date" />
            </div>
          </div>

          <div className="w-full h-75">
            <textarea
              placeholder="Place..."
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="mt-1 block w-full h-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xl font-bold"
            />
          </div>
        </div>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="modal fixed inset-0 flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded-md shadow-lg border-2 border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
          <p className="mb-4">Are you sure you want to delete this task?</p>
          <div className="flex justify-end gap-2">
            <button className="bg-gray-300 text-xl font-bold py-2 px-4 rounded-md hover:bg-gray-400" onClick={closeModal}>
              Cancel
            </button>
            <button
              className="bg-red-700 text-xl font-bold text-white py-2 px-4 rounded-md hover:bg-red-500"
              onClick={() => {
                handleDelete();
                closeModal();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskDetail;
