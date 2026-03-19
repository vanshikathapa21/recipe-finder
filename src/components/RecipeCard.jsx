function RecipeCard({ recipe, onSelect, addToFavorites }) {
  return (
    <div className="recipe-card">
      
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <h3>{recipe.strMeal}</h3>

      {}
      <button className="view-btn" onClick={onSelect}>
        👀 View Recipe
      </button>

      {}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToFavorites(recipe);
        }}
      >
        ❤️ Favorite
      </button>

    </div>
  );
}

export default RecipeCard;