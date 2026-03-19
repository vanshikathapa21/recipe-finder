function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="modal" onClick={onClose}>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <h2>{recipe.strMeal}</h2>

        <img src={recipe.strMealThumb} alt={recipe.strMeal} />

        {}
        <div className="modal-body">
          <p>
            {recipe?.strInstructions
              ? recipe.strInstructions
              : "No steps available"}
          </p>
        </div>

        <button onClick={onClose}>Close</button>

      </div>
    </div>
  );
}

export default RecipeModal;