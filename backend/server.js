const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();


connectDB();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend + DB working 🚀");
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

    const recipes = response.data.meals.map((meal) => ({
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
    }));

    res.json(recipes);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json([]);
  }
});

app.use("/api", recipeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});