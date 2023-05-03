// const express = require('express');
// const app = express();
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://astudillokiran:CDYgzp6AwAt9wAUE@kanban.kwgwtn6.mongodb.net/?retryWrites=true&w=majority";
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
// app.use(bodyParser.json());
// //import Routes
// const boardsRoute = require('./routes/boards');

// app.use(cors());
// app.use('/boards', boardsRoute);
// app.use(express.json());
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//     app.listen(process.env.PORT || 5000, () => {
//       console.log('Server started on port 5000');
//     });
//   }
// }
// run().catch(console.dir);

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
app.use(bodyParser.json());
app.use(cors());

//Database connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


app.use('/boards', boardsRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})




