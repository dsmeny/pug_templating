const mongoose = require("mongoose");

// schema
const schema = mongoose.Schema({
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

const Article = mongoose.model("Article", schema);

module.exports = Article;
