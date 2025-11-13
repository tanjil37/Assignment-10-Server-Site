const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://books-db:FNyqY9sHCsiL4VsG@cluster0.syvrcr2.mongodb.net/?appName=Cluster0";

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
    await client.connect();

    const db = client.db("books-db");
    const bookCollection = db.collection("books");

    //find
    //findOne
    app.get("/books", async (req, res) => {
      const result = await bookCollection.find().toArray();
      //console.log(result)

      res.send(result);
    });

   
    // post method
    //  insertOne
    //  insertMany

    app.post("/books", async (req, res) => {
      const data = req.body;
      // console.log(data)
      const result = await bookCollection.insertOne(data);
      res.send({
        success: true,
        result,
      });
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World hi!");
});
app.get("/hello", (req, res) => {
  res.send("Hello are you?");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
