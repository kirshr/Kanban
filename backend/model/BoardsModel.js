const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  });

const BoardsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    columns: {type: [ColumnSchema], required: true},
});

module.exports = mongoose.model('Boards', BoardsSchema);
