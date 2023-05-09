const express = require('express');
const router = express.Router();
const Task = require('../model/TasksModel');
const Board = require('../model/BoardsModel');

//create a new board

router.post('/', async (req, res) => {
    const title = req.body.title;
    const columns = req.body.columns
    const newBoard = new Board({
        title: title,
        columns: columns
    });
    try {
        const savedBoard = await newBoard.save();
        console.log(newBoard);
        res.status(200).json({ message: "Board created successfully", savedBoard });
    } catch (err) {
        res.status(500).json({message: "Error creating board", err: err});
    }
});

//Get all boards

router.get('/', async (req, res) => {
    try {
        const boards = await Board.find();
        res.status(200).json({ message: "Boards fetched successfully", boards: boards });
    } catch (err) {
        res.status(500).json({ message: "Error fetching boards", err: err });
    }
});

//Get a specific board
router.get('/:id', async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);
        res.status(200).json({ message: "Board fetched successfully", board: board });
    } catch (err) {
        res.status(500).json({ message: "Error fetching board", err: err });
    }
});


//Add tasks to board
router.put('/add', async (req, res) => {
    const boardId = req.body.boardId;
    const columnId = req.body.columnId;
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      subtasks: req.body.subtasks,
      status: req.body.status,
      boardId: boardId,
    });
    try {
      const newTask = await task.save();
      console.log("My New Task: ", newTask);
      const updatedBoard = await Board.findOneAndUpdate(
        { _id: boardId },
        { $push: { tasks: newTask } },
        { new: true }
      );
      
      res.status(201).json({ message: 'Task added to board', updatedBoard });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  //Update a specific task in the board
router.put('/update/:id', async (req, res) => {
    const taskId = req.params.id;
    const { title, description, subtasks, status } = req.body;
    try {
        const updateTask = await Task.findByIdAndUpdate(taskId,
            { title, description, subtasks, status },
            { new: true });
        res.status(200).json({ message: "Task updated successfully", updateTask });
    } catch (err) {
        res.status(500).json({ message: "Error updating task", err: err });
    }
});


module.exports = router;