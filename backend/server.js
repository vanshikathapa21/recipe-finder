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
    const ingredientParam = req.query.ingredients;

    if (!ingredientParam) {
      return res.json([]);
    }

    // Parse ingredients - can be comma separated or space separated
    const ingredientList = ingredientParam
      .split(/[,\s]+/)
      .map((ing) => ing.trim().toLowerCase())
      .filter((ing) => ing.length > 0);

    if (ingredientList.length === 0) {
      return res.json([]);
    }

    // Fetch recipes for each ingredient
    let allRecipes = [];
    const foundIngredients = [];
    const failedIngredients = [];

    for (const ingredient of ingredientList) {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
        );

        if (response.data && response.data.meals) {
          foundIngredients.push(ingredient);
          allRecipes = [...allRecipes, ...response.data.meals];
        } else {
          failedIngredients.push(ingredient);
        }
      } catch (err) {
        console.log(`Error fetching recipes for ${ingredient}:`, err.message);
        failedIngredients.push(ingredient);
      }
    }

    console.log(`✅ Found results for: ${foundIngredients.join(", ") || "none"}`);
    console.log(`❌ No results for: ${failedIngredients.join(", ") || "none"}`);

    // Remove duplicates (same meal ID)
    const uniqueRecipes = allRecipes.reduce((acc, meal) => {
      if (!acc.find((m) => m.idMeal === meal.idMeal)) {
        acc.push(meal);
      }
      return acc;
    }, []);

    const recipes = uniqueRecipes
      .map((meal) => ({
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
      }))
      .slice(0, 20); // Limit to 20 results for better performance

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