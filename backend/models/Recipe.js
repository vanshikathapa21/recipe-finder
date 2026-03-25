const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);