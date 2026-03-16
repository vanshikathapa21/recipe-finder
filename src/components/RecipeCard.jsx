function RecipeCard({ recipe, onSelect, addToFavorites }) {
  return (
    <div className="recipe-card">

      <img src={recipe.image} alt={recipe.title} />

      <h3>{recipe.title}</h3>

      <button onClick={() => onSelect(recipe.id)}>
        View Recipe
      </button>

      <button onClick={() => addToFavorites(recipe)}>
        ❤️ Favorite
      </button>

    </div>
  );
}

export default RecipeCard;