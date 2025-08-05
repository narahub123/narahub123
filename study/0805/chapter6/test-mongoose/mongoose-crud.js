const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");

// 경고를 없애기 위한 설정 => 뭐에 대한 경고
mongoose.set("strictQuery", false);

const app = express();

app.use(bodyParser.json());

app.listen(3000, async () => {
  console.log("Server started");

  const mongodbUri = process.env.MONGO_URI;

  mongoose
    .connect(mongodbUri, { useNewUrlParser: true })
    .then(console.log("Connectd to MongoDB"));
});

app.get("/person", async (req, res) => {
  const person = await Person.find({});

  res.send(person);
});

app.get("/person/:email", async (req, res) => {
  const person = await Person.find({ email: req.params.email });

  res.send(person);
});

app.post("/person", async (req, res) => {
  const person = new Person(req.body);

  await person.save();

  res.send(person);
});

app.put("/person/:email", async (req, res) => {
  const person = await Person.findOneAndUpdate(
    { email: req.params.email },
    { $set: req.body },
    { new: true }
  );

  console.log(person);

  res.send(person);
});

app.delete("/person/:email", async (req, res) => {
  await Person.deleteMany({ email: req.params.email });

  res.send({ success: true });
});
