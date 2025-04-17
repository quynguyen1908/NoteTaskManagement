import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Tạo task mới
export const createTask = async (title: string, description: string, place : string , beginDate : string , endDate : string, userId: string ) => {
    try {
        const response = await axios.post(`${API_URL}/tasks/new`, { title, description, place , beginDate , endDate, userId }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

// Lấy tất cả tasks
export const getAllTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error getting tasks:', error);
        throw error;
    }
};

// Lấy danh sách tasks theo userId
export const getTasksByUserId = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/tasks/user/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error getting tasks by user id:', error);
        throw error;
    }
};

// Lấy chi tiết task theo id
export const getTaskById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/tasks/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error getting task by id:', error);
        throw error;
    }
};

// Cập nhật task
export const updateTask = async (id: string, title: string, description: string, place : string , beginDate : string , endDate : string, status : string) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/update/${id}`, { title, description, place,beginDate, endDate, status }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

// Xóa task
export const deleteTask = async (id: string) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/delete/${id}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};
