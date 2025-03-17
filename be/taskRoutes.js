const express = require('express');
const mongoose = require('mongoose');
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
    deleted: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

// Tạo task mới
router.post('/tasks/new', async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            place  : req.body.place,
            beginDate: req.body.beginDate,
            endDate: req.body.endDate,
        });
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy tất cả tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({ deleted: false });
        res.json(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy task theo id
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cập nhật task theo id
router.put('/tasks/update/:id', async (req, res) => {
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
router.put('/tasks/delete/:id', async (req, res) => {
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
