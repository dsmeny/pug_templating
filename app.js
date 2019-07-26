const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Init App
app.use(express.json());

// Load View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// schema
const schema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    min: 0
  },
  title: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    required: true,
    max: 255
  },
  body: {
    type: String,
    trim: true
  }
});

const Article = mongoose.model("article", schema);

// routes
app.get("/", async (req, res) => {
  try {
    const articles = await Article.find();

    res
      .status({
        status: 200,
        message: "success!",
        total: data.length
      })
      .render("index", { title: "Articles", articles });
  } catch (err) {
    res.status(400).send({
      state: "400 error. Bad request.",
      message: err.messages
    });
  }
});

app.get("/articles/add", async (req, res) => {
  res.render("add_article", {
    title: "Add Article"
  });
  //   try {
  //     const data = await Article.find();

  //     res.status(200).send({
  //       message: "success!",
  //       total: data.length,
  //       data
  //     });
  //   } catch (err) {
  //     res.status(400).send({
  //       state: "400 error. Bad request.",
  //       message: err.messages
  //     });
  //   }
});

// app.get("/:id", async (req, res) => {
//   try {
//     const data = await Article.findOne({ _id: req.params.id });
//     res.status(200).send({
//       message: "success!",
//       data
//     });
//   } catch (err) {
//     res.status(400).send({
//       state: "400 error. Bad request.",
//       message: err.messages
//     });
//   }
// });

// app.post("/", async (req, res) => {
//   try {
//     const message = new Article({
//       name: req.body.name,
//       message: req.body.message
//     });

//     const result = await message.save();

//     res.status(200).send(result);
//   } catch (err) {
//     res.status(400).send({
//       state: "400 error. Bad request.",
//       message: err.message
//     });
//   }
// });

// app.put("/:id", async (req, res) => {
//   try {
//     const data = await Article.findByIdAndUpdate(
//       req.params.id,
//       {
//         message: req.body.message
//       },
//       { new: true }
//     );

//     res.status(200).send({
//       message: "success!",
//       data
//     });
//   } catch (err) {
//     res.status(400).send({
//       state: "400 error. Bad request.",
//       message: err.messages
//     });
//   }
// });

// app.delete("/:id", async (req, res) => {
//   try {
//     const data = await Article.findByIdAndDelete(req.params.id);

//     res.status(200).send({
//       message: "success!"
//     });
//   } catch (err) {
//     res.status(400).send({
//       state: "400 error. Bad request.",
//       message: err.messages
//     });
//   }
// });

mongoose.connect(
  "mongodb://localhost/article",
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true },
  (err, data) => {
    try {
      console.log("Now connected to mongodb");
    } catch (err) {
      console.log(err.message);
    }
  }
);

// server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
