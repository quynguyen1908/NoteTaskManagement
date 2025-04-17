const express = require('express');
const mongoose = require('mongoose');
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


// Định nghĩa Mongoose Schema và Model cho ghi chú
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    status: { type: String, default: 'pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});
  
const Note = mongoose.model('Note', noteSchema);

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

// Tạo ghi chú mới
router.post('/notes/new', authenticateToken, async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userId,
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy tất cả ghi chú
router.get('/notes', authenticateToken, async (req, res) => {
    try {
        const notes = await Note.find({ deleted: false });
        res.json(notes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy tất cả ghi chú theo id người dùng
router.get('/notes/user/:userId', authenticateToken, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.params.userId, deleted: false });
        res.json(notes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lây ghi chú theo id
router.get('/notes/:id', authenticateToken, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.json(note);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cập nhật ghi chú theo id
router.put('/notes/update/:id', authenticateToken, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        note.title = req.body.title;
        note.content = req.body.content;
        note.status = req.body.status;
        note.updatedDate = Date.now();
        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Xóa ghi chú theo id
router.put('/notes/delete/:id', authenticateToken, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        note.deleted = true;
        note.updatedDate = Date.now();
        const deletedNote = await note.save();
        res.json(deletedNote);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;