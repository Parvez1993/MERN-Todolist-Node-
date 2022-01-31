const express = require("express");
// Using Node.js `require()`
var cors = require("cors");
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");

app.use(cors());
mongoose
  .connect(
    `mongodb+srv://parvez:12341234@cluster0.pj6ne.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected");
  });

const TodoModel = mongoose.Schema({
  task: { type: String }, // String is shorthand for {type: String}
  desc: String,
});

const Todos = mongoose.model("todos", TodoModel);

app.use(express.json());

app.get(`${process.env.API_URL}/todo`, async function (req, res) {
  let products = await Todos.find();
  res.send(products);
});

app.post(`${process.env.API_URL}/todo`, function (req, res) {
  let product = new Todos({
    task: req.body.task,
    desc: req.body.desc,
  });
  product
    .save()
    .then((productlist) => res.status(201).json(productlist))
    .catch((err) => res.status(400).json(err));
});
//get user post

app.delete(`${process.env.API_URL}/todo/:id`, async function async(req, res) {
  const id = req.params.id;
  await Todos.deleteOne({ _id: id });
});

app.patch(`${process.env.API_URL}/todo/:id`, async function async(req, res) {
  const id = req.params.id;
  await Todos.updateOne(
    { _id: id },
    { $set: { task: req.body.task, desc: req.body.desc } }
  );
  res.send("updated");
});

app.listen(8000);
