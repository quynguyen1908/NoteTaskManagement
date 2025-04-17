import React, { useEffect, useState } from 'react';
import { getTasksByUserId } from '../../api/taskApi';
import { getUserInfo } from '../../api/authApi';
import { Task } from '../../types/Task';
import { NavLink } from 'react-router-dom';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                    throw new Error('User email not found in local storage.');
                }
                const userInfo = await getUserInfo(email);
                const tasks = await getTasksByUserId(userInfo._id);
                setTasks(tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            };
            setLoading(false);
        };

        fetchTasks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    const getTaskBackgroundColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-red-100';
            case 'completed':
                return 'bg-green-100';
            default:
                return 'bg-gray-100';
        }
    };
    return (
        <>
            <div className="font-bold text-4xl bg-gray-300 w-full h-1/5 flex justify-center items-center">YOUR TASKS</div>
            <div className="bg-white flex h-4/5 overflow-x-auto">
                <ul className='flex w-full py-20 pl-20'>
                    {tasks.map((task) => (
                        <li 
                        className={`${getTaskBackgroundColor(task.status)} rounded-lg p-4 m-4 w-[200px] flex-shrink-0`}
                        key={task._id}
                        >
                            <NavLink to={`/home/tasks/${task._id}`} className='flex flex-col gap-10 h-full'>
                                <div className='font-bold text-xl text-center overflow-hidden truncate'>
                                    {task.title}
                                </div>
                                <p className='text-xl flex-1 overflow-hidden line-clamp-9' style={{ whiteSpace: 'pre-wrap' }} >
                                    {task.content}
                                </p>
                            </NavLink>
                        </li>
                    ))}
                    <li className='flex-shrink-0 w-[80px]'></li> {/* Add an empty li to provide padding at the end */}
                </ul>
            </div>
        </>
    );
};

export default TaskList;
