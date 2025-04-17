import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Đăng nhập
export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Đăng ký
export const register = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { email, password }, { withCredentials: true });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};

// Đăng xuất
export const logout = async () => {
    try {
        const response = await axios.get(`${API_URL}/logout`, { withCredentials: true });
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

// Lấy thông tin người dùng
export const getUserInfo = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error getting user info:', error);
        throw error;
    }
};