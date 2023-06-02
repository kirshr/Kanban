const express = require('express');
const router = express.Router();
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



  // Add tasks to a specific board
router.put('/add/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, subtasks, status, boardId } = req.body;

  try {
    const board = await Board.findById(id);
    const newTask = { title, description, subtasks, status, boardId };
    board.tasks.push(newTask);
    const updatedBoard = await board.save();

    res.status(201).json({ message: 'Task added to board', updatedBoard });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, subtasks, status } = req.body;

  try {
    const board = await Board.findOneAndUpdate(
      { "tasks._id": id },
      {
        $set: {
          "tasks.$.title": title,
          "tasks.$.description": description,
          "tasks.$.subtasks": subtasks,
          "tasks.$.status": status
        }
      },
      { new: true }
    );

    res.status(200).json({ message: "Task updated successfully", board });
  } catch (err) {
    res.status(500).json({ message: "Error updating task", err: err });
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const boards = await Board.find();
    const allTasks = boards.reduce((tasks, board) => {
      return tasks.concat(board.tasks);
    }, []);
    res.status(200).json({ message: "All tasks fetched successfully", tasks: allTasks });
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", err: err });
  }
});


// Get all tasks from a specific board
router.get('/tasks/board/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const board = await Board.findById(id);
    const tasks = board.tasks;
    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", err: err });
  }
});

// Delete a specific board
router.delete('/delete/:id', async (req, res) => {
    try {
      const boardId = req.params.id;
      // Remove the board
      const deletedBoard = await Board.findByIdAndRemove(boardId);
      // Remove the associated tasks
      await Board.deleteMany({ boardId: boardId });
      res.status(200).json({ message: "Board deleted successfully", deletedBoard });
    } catch (err) {
      res.status(500).json({ message: "Error deleting board", err: err });
    }
});
  
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
  const board = await Board.findOneAndUpdate(
  { "tasks._id": id },
  { $pull: { tasks: { _id: id } } },
  { new: true }
    );
    res.status(200).json({ message: "Task deleted successfully", board });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", err: err });
    }
});
    
module.exports = router;