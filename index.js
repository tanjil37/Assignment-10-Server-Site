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
    //Get all book
    app.get("/books", async (req, res) => {
      const result = await bookCollection.find().toArray();
      //console.log(result)

      res.send(result);
    });

    //get one book
    app.get("/books/:id", async (req, res) => {
      const { id } = req.params;
      console.log(id);
      const result = await bookCollection.findOne({ _id: new ObjectId(id) });

      res.send({
        success: true,
        result,
      });
    });

    // post method
    //  insertOne
    //  insertMany

    //add book
    app.post("/books", async (req, res) => {
      const data = req.body;
      // console.log(data)
      const result = await bookCollection.insertOne(data);
      res.send({
        success: true,
        result,
      });
    });

   
  app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ success: false, message: "Invalid ID format" });
    }

    
    delete updatedData._id;

    const objectId = new ObjectId(id);

    const result = await bookCollection.updateOne(
      { _id: objectId },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ success: false, message: "Book not found" });
    }

    res.send({
      success: true,
      message: "Book updated successfully",
      result,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});


    //  Delete Book
    app.delete("/books/:id", async (req, res) => {
      const { id } = req.params;
      const result = await bookCollection.deleteOne({ _id: new ObjectId(id) });
      res.send({ success: true, result });
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
