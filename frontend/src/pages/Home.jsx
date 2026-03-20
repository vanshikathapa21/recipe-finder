import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IngredientsInput from "../components/IngredientsInput";
import IngredientList from "../components/IngredientList";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import FavoriteModal from "../components/FavoriteModal";
import { getRecipes } from "../services/recipeApi";

function Home({
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  loading,
  setLoading,
  error,
  setError,
  selectedRecipe,
  setSelectedRecipe,
  hasSearched,
  setHasSearched,
  favoriteModalRecipe,
  setFavoriteModalRecipe,
  setFavCount,
}) {
  const handleGetRecipe = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      if (ingredients.length === 0) {
        setError("Please enter at least 1 ingredient");
        setLoading(false);
        return;
      }

      const result = await getRecipes(ingredients);
      console.log("Fetched recipes:", result);

      if (!result || result.length === 0) {
        setError("No recipes found for these ingredients 😢");
        setRecipes([]);
      } else {
        setRecipes(result);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching recipes");
    } finally {
      setLoading(false);
    }
  }, [ingredients, setLoading, setError, setHasSearched, setRecipes]);

  const handleSelectRecipe = useCallback(async (id) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      const data = await res.json();

      if (data.meals && data.meals.length > 0) {
        const meal = data.meals[0];

        // Extract ingredients and measurements
        const ingredientsList = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim()) {
            ingredientsList.push(`${measure} ${ingredient}`);
          }
        }

        meal.strIngredients = ingredientsList;
        setSelectedRecipe(meal);
      } else {
        alert("No details found 😢");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching recipe details");
    }
  }, [setSelectedRecipe]);

  const addToFavorites = useCallback((recipe) => {
    setFavoriteModalRecipe(recipe);
  }, [setFavoriteModalRecipe]);

  const confirmAddToFavorites = useCallback((recipe) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const recipeId = recipe.id || recipe.idMeal;
    const exists = favorites.find((item) => (item.id || item.idMeal) === recipeId);

    if (!exists) {
      favorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setFavCount(favorites.length);
    }

    setFavoriteModalRecipe(null);
  }, [setFavCount, setFavoriteModalRecipe]);

  const closeFavoriteModal = useCallback(() => {
    setFavoriteModalRecipe(null);
  }, [setFavoriteModalRecipe]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <div>
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>🍲 Khana Khazana</h1>
        <p>Discover amazing recipes with ingredients you have</p>
      </motion.div>

      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <IngredientsInput setIngredients={setIngredients} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <IngredientList
            ingredients={ingredients}
            handleGetRecipe={handleGetRecipe}
            setIngredients={setIngredients}
          />
        </motion.div>

        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                textAlign: "center",
                margin: "20px 0",
                fontSize: "16px",
                fontWeight: "600",
                color: "#667eea",
              }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⏳ Loading recipes...
              </motion.span>
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              key="error"
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                color: "#f5576c",
                textAlign: "center",
                margin: "20px 0",
                padding: "12px",
                borderRadius: "8px",
                background: "rgba(245, 87, 108, 0.1)",
                fontWeight: "600",
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {ingredients.length > 0 && !error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: "#666",
              fontWeight: "600",
            }}
          >
            Searching for: <span style={{ color: "#667eea" }}>{ingredients.join(", ")}</span>
          </motion.p>
        )}

        <motion.div
          className="recipes-container"
          variants={containerVariants}
          initial="hidden"
          animate={recipes.length > 0 ? "visible" : "hidden"}
        >
          <AnimatePresence>
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id || recipe.idMeal}
                recipe={recipe}
                onSelect={() => handleSelectRecipe(recipe.id || recipe.idMeal)}
                addToFavorites={addToFavorites}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {!loading && recipes.length === 0 && hasSearched && !error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              marginTop: "40px",
              color: "#999",
              fontSize: "16px",
            }}
          >
            No recipes found for these ingredients. Try different ingredients!
          </motion.p>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {favoriteModalRecipe && (
          <FavoriteModal
            recipe={favoriteModalRecipe}
            onConfirm={() => confirmAddToFavorites(favoriteModalRecipe)}
            onCancel={closeFavoriteModal}
            isAlreadyFavorite={
              JSON.parse(localStorage.getItem("favorites") || "[]").some(
                (item) => (item.id || item.idMeal) === (favoriteModalRecipe.id || favoriteModalRecipe.idMeal)
              )
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;