const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q1lzp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const itemCollection = client.db('megaGrocery').collection('items');
        const newItemCollection = client.db('megaGrocery').collection('newitem');

        //all data get API
        app.get('/item', async (req, res) => {
            const query = {};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });

        // show specific user items API
        app.get('/newitem', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const cursor = newItemCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })

        // add new item API
        app.post('/newitem', async (req, res) => {
            const newItem = req.body;
            const result = await newItemCollection.insertOne(newItem);
            res.send(result);
        })

        //delete item
        app.delete('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Running server");
});

app.listen(port, () => {
    console.log("Listen to port", port);
});
