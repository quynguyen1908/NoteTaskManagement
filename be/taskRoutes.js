const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();


// Định nghĩa Mongoose Schema và Model cho task
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }, 
    place: { type: String, required: true },
    beginDate: { type: String, required: true },
    endDate: { type: String, required: true },
  
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Task = mongoose.model('Task', taskSchema);

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

// Tạo task mới
router.post('/tasks/new', authenticateToken, async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            place  : req.body.place,
            beginDate: req.body.beginDate,
            endDate: req.body.endDate,
            userId: req.body.userId,
        });
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy tất cả tasks
router.get('/tasks', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find({ deleted: false });
        res.json(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy tất cả tasks theo id người dùng
router.get('/tasks/user/:userId', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.params.userId, deleted: false });
        res.json(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy task theo id
router.get('/tasks/:id', authenticateToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cập nhật task theo id
router.put('/tasks/update/:id', authenticateToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.title = req.body.title;
        task.description = req.body.description;
        task.place = req.body.place;
        task.beginDate = req.body.beginDate;
        task.endDate = req.body.endDate;
        task.status = req.body.status;
        task.updatedDate = Date.now();
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Xóa task theo id
router.put('/tasks/delete/:id', authenticateToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.deleted = true;
        task.updatedDate = Date.now();
        const deletedTask = await task.save();
        res.json(deletedTask);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;