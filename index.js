const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.to58y.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (Optional starting in v4.7)
    await client.connect();

    const usersDB = client.db("usersDB");
    const usersCollection = usersDB.collection("usersCollection");

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    // Send a ping to confirm successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Your server running on port http://localhost:${PORT}`);
});
