import { useState } from "react";
import IngredientsInput from "../components/IngredientsInput";
import IngredientList from "../components/IngredientList";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import { getRecipes } from "../services/recipeApi";
import { getRecipeDetails } from "../services/recipeApi";

function Home({ setFavCount }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

async function handleGetRecipe() {
  try {
    setLoading(true);
    setError("");

    if (ingredients.length === 0) {
      setError("Please enter at least 1 ingredient");
      setLoading(false);
      return;
    }

    const result = await getRecipes(ingredients);
    console.log("Fetched recipes:", result);

    if (!result || result.length === 0) {
      setError("No recipes found 😢");
      setRecipes([]);
    } else {
      setRecipes(result);
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong");
  }

  setLoading(false);
}

async function handleSelectRecipe(recipe) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
    );

    const data = await res.json();

    console.log("API RESPONSE:", data);

    if (data.meals && data.meals.length > 0) {
      setSelectedRecipe(data.meals[0]); // ✅ FULL DATA
    } else {
      alert("No details found 😢");
    }
  } catch (err) {
    console.error(err);
    alert("Error fetching recipe");
  }
}

function addToFavorites(recipe) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const exists = favorites.find((item) => item.idMeal === recipe.idMeal);

  if (!exists) {
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to favorites ❤️");
  } else {
    alert("Already in favorites 😄");
  }

  setFavCount(favorites.length);
}

  return (
    <div>
      <div className="hero">
        <h1>🍲 Khana Khazana</h1>
        <p>Enter ingredients you have and discover amazing recipes instantly.</p>
      </div>

      <div className="container">
        <IngredientsInput setIngredients={setIngredients} />

        <IngredientList
          ingredients={ingredients}
          handleGetRecipe={handleGetRecipe}
          setIngredients={setIngredients}
        />

        {loading && <p>⏳ Loading recipes...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {ingredients.length > 0 && <p>Using: {ingredients.join(", ")}</p>}

        <div className="recipes-container">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onSelect={() => handleSelectRecipe(recipe)}
              addToFavorites={addToFavorites}
            />
          ))}
        </div>

        {!loading && recipes.length === 0 && !error && (
          <p>No recipes found for these ingredients.</p>
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

export default Home;