const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());




app.get("/", (req, res) => {
    res.send("Running server");
});

app.listen(port, () => {
    console.log("Listen to port", port);
});
