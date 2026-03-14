function RecipeModal({ recipe, onClose }) {

  if (!recipe) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-content">

        <button className="close-btn" onClick={onClose}>❌</button>

        <h2>{recipe.strMeal}</h2>

        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal}
        />
        
        <p>{recipe.strInstructions}</p>

      </div>

    </div>
  );
}

export default RecipeModal;