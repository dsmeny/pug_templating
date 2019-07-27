const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const Article = require("./models/article");

// Load View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Init App
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", async (req, res) => {
  try {
    let articles = await Article.find({});
    res.status(200).render("index", {
      title: "Articles",
      articles
    });
  } catch (err) {
    res.status(400).send({
      state: "400 error. Bad request.",
      message: err.messages
    });
  }
});

// Add Route
app.get("/articles/add", async (req, res) => {
  try {
    res.status(200).render("add_article", {
      title: "Add Article"
    });
  } catch (err) {
    res.status(400).send({
      state: "400 error. Bad request.",
      message: err.messages
    });
  }
});

// Add submit post route
app.post("/articles/add", async (req, res) => {
  try {
    let article = new Article({
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    });

    await article.save();
    res.status(200).redirect("/");
  } catch (err) {
    console.log(err);
  }
});

mongoose.connect(
  "mongodb://localhost/article",
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true },
  (err, data) => {
    try {
      console.log("Connected to mongodb");
    } catch (err) {
      console.log(err.message);
    }
  }
);

// server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
