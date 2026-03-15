const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

app.get("/recipes", async (req, res) => {
  try {
    const ingredients = req.query.ingredients;

    if (!ingredients) {
      return res.json([]);
    }

    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
    );

    if (!response.data || !response.data.meals) {
      return res.json([]);
    }

    const recipes = response.data.meals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb
    }));

    res.json(recipes);

  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json([]);
  }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});