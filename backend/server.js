if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const bodyParser = require('body-parser');


//Import routes
const boardsRoute = require('./routes/boards');
const tasksRoute = require('./routes/tasks');
app.use(bodyParser.json());
app.use(cors());

//Database connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


app.use('/boards', boardsRoute);
app.use('/tasks', tasksRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})




