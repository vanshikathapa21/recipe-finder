const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);