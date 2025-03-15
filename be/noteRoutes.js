const express = require('express');
const mongoose = require('mongoose');
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
    status: { type: String, default: 'pending' }
});
  
const Note = mongoose.model('Note', noteSchema);

// Tạo ghi chú mới
router.post('/notes/new', async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            content: req.body.content
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy tất cả ghi chú
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({ deleted: false });
        res.json(notes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lây ghi chú theo id
router.get('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.json(note);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cập nhật ghi chú theo id
router.put('/notes/update/:id', async (req, res) => {
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
router.put('/notes/delete/:id', async (req, res) => {
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