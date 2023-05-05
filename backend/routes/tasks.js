const express = require('express');
const router = express.Router();

const Task = require('../model/TasksModel');

//Create new Task

router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    subtasks: req.body.subtasks,
    status: req.body.status,
    boardId: req.body.boardId,
  });
  try {
    const newTask = await task.save();
    console.log(newTask);
    res.status(201).json({ newTask: newTask });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get all Tasks

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks: tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Gets tasks from a specific board

router.get('/:id', async (req, res) => {
  try {
    const tasks = await Task.find({ boardId: req.params.id });
    res.json({ tasks: tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;