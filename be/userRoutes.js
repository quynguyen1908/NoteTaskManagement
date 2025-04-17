const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/note_task_db')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Định nghĩa schema và model cho người dùng
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

// Middleware để xác thực token JWT
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Không có token, vui lòng đăng nhập!' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token không hợp lệ!' });
        }
        req.user = user;
        next();
    });
};

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã được sử dụng!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ message: 'Đăng ký thành công!', token: token });
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi!' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng!' });
        }  
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng!' });
        }
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Đăng nhập thành công!', token: token });
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi!' });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Đăng xuất thành công!' });
});

router.get('/users/:email', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại!' });
        }  
        res.status(200).json(user); 
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi!' });
    }   
});

module.exports = router;