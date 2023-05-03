const express = require('express');
const router = express.Router();

const Board = require('../model/BoardsModel');

//create a new board

router.post('/', async (req, res) => {
    const newBoard = new Board(req.body);
    try {
        const savedBoard = await newBoard.save();
        res.status(200).json(savedBoard);
        console.log(savedBoard);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;