function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <h2>{recipe.strMeal}</h2>

        <img src={recipe.strMealThumb} alt={recipe.strMeal} />

        {}
        <div className="modal-body">
          {recipe?.strInstructions ? (
            recipe.strInstructions.split("\r\n").map((step, index) => (
              <p key={index}>
                <strong>Step {index + 1}:</strong> {step}
              </p>
            ))
          ) : (
            <p>No steps available</p>
          )}
        </div>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default RecipeModal;