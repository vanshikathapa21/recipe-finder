const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

router.post("/favorites", async (req, res) => {
  try {
    const { id, title, image } = req.body;

    const newRecipe = new Recipe({
      id,
      title,
      image,
    });

    await newRecipe.save();

    res.status(201).json({ message: "Recipe Saved ❤️" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const favorites = await Recipe.find();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/favorites/:id", async (req, res) => {
  try {
    await Recipe.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;