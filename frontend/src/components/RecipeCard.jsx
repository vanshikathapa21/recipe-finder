import { motion } from "framer-motion";

function RecipeCard({ recipe, onSelect, addToFavorites }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -12,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className="recipe-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <img src={recipe.image || recipe.strMealThumb} alt={recipe.title || recipe.strMeal} />

      <h3>{recipe.title || recipe.strMeal}</h3>

      <div className="recipe-card-buttons">
        <motion.button
          className="view-btn"
          variants={buttonVariants}
          whileHover="hover"
          onClick={onSelect}
        >
          👀 View Recipe
        </motion.button>

        <motion.button
          className="favorite-btn"
          variants={buttonVariants}
          whileHover="hover"
          onClick={(e) => {
            e.stopPropagation();
            addToFavorites(recipe);
          }}
        >
          ❤️ Favorite
        </motion.button>
      </div>
    </motion.div>
  );
}

export default RecipeCard;