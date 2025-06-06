import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Tạo ghi chú mới
export const createNote = async (title: string, content: string, userId: string) => {
    try {
        const response = await axios.post(`${API_URL}/notes/new`, { title, content , userId }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
};

// Lấy tất cả ghi chú
export const getAllNotes = async () => {
    try {
        const response = await axios.get(`${API_URL}/notes`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error getting notes:', error);
        throw error;
    }
};

// Lấy danh sachs ghi chú theo userId
export const getNotesByUserId = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/notes/user/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error getting notes by user id:', error);
        throw error;
    }
}

// Lấy chi tiết ghi chú theo id
export const getNoteById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/notes/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error getting note by id:', error);
        throw error;
    }
};

// Cập nhật ghi chú
export const updateNote = async (id: string, title: string, content: string, status: string) => {
    try {
        const response = await axios.put(`${API_URL}/notes/update/${id}`, { title, content, status }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
};

// Xóa ghi chú
export const deleteNote = async (id: string) => {
    try {
        const response = await axios.put(`${API_URL}/notes/delete/${id}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
};