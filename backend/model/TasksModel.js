const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subtasks: { type: Array, required: true },
  status: { type: String, required: true },
  boardId: { type: String, required: true },
});

module.exports = mongoose.model('Tasks', TasksSchema);