const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  checked: { type: Boolean, default: false },
});

const TasksSchema = new mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  subtasks: { type: [SubtaskSchema], required: false },
  status: { type: String, required: false },
  boardId: { type: String, required: false },
});

const ColumnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const BoardsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  columns: {
    type: [ColumnSchema],
    required: true,
  },
  tasks: {
    type: [TasksSchema],
    required: true
  }
});

module.exports = mongoose.model('Boards', BoardsSchema);
