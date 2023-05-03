const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://astudillokiran:CDYgzp6AwAt9wAUE@kanban.kwgwtn6.mongodb.net/?retryWrites=true&w=majority";

//import Routes
const boardsRoute = require('./routes/boards');

app.use(cors());
app.use('/boards', boardsRoute);
app.use(express.json());
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server started on port 5000');
    });
  }
}
run().catch(console.dir);




