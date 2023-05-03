const express = require('express');
const router = express.Router();

const Board = require('../model/BoardsModel');

//create a new board

router.post('/', async (req, res) => {
    const title = req.body.title;
    const newBoard = new Board({
        title: title
    });
    try {
        const savedBoard = await newBoard.save();
        console.log(newBoard);
        res.status(200).json({message: "Board created successfully", savedBoard});
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

module.exports = router;