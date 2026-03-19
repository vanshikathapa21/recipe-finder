function IngredientList({ ingredients, handleGetRecipe, setIngredients }) {

  function removeIngredient(index) {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div>

      {}
      <ul className="ingredient-list">
        {ingredients.map((item, index) => (
          <li className="ingredient-item" key={index}>
            <span>{item}</span>

            <button onClick={() => removeIngredient(index)}>
              ❌
            </button>
          </li>
        ))}
      </ul>

      {}
      <div className="actions">
        <button onClick={handleGetRecipe}>Get Recipes</button>
        <button onClick={() => setIngredients([])}>Clear All</button>
      </div>

    </div>
  );
}

export default IngredientList;