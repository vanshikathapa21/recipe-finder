import { useState, useEffect } from "react";
import IngredientsInput from "../components/IngredientsInput";
import IngredientList from "../components/IngredientList";
import { getRecipes, getRecipeDetails } from "../services/recipeApi";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

function Home() {

  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  async function handleGetRecipe() {
  try {
    setLoading(true);
    setError("");

    if (ingredients.length === 0) return;

    const result = await getRecipes([ingredients[0]]);

    const filteredRecipes = result.filter(recipe =>
      ingredients.some(ing =>
        recipe.title.toLowerCase().includes(ing)
      )
    );

    setRecipes(filteredRecipes.length ? filteredRecipes : result);

  } catch (err) {
    setError("Something went wrong");
  }

  setLoading(false);
} 

async function handleSelectRecipe(id) {
  try {
    const data = await getRecipeDetails(id);

    console.log("Recipe Details:", data);

    setSelectedRecipe(data);

  } catch (error) {
    console.log("Error loading recipe", error);
  }
}

function addToFavorites(recipe) {

  const updatedFavorites = [...favorites, recipe];

  setFavorites(updatedFavorites);

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

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

        {ingredients.length > 0 && (
          <p>Showing recipes using: {ingredients.join(", ")}</p>
      )}

        <div className="recipes-container">

          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onSelect={handleSelectRecipe}
              addToFavorites={addToFavorites}
            />
          ))}

        </div>

        {!loading && recipes.length === 0 && (
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