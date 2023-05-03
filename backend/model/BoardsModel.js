const mongoose = require('mongoose');

const BoardsSchema = new mongoose.Schema({
    title: { type: String, required: true },
});

module.exports = mongoose.model('Boards', BoardsSchema);
