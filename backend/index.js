const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");

const app = express();

const mongodbURI = process.env.MONGODB_URI;

mongoose.connect(mongodbURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error =>"));

db.once("open", () => {
  console.log("Connected to database sucessfully!");
})

app.use(express.json());
app.use(productRouter);

app.use(express.json());
app.use(userRouter);


app.listen(4000, "0.0.0.0", () => {
  console.log("server started at port 4000");
});