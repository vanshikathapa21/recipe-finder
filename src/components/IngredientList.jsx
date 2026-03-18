function IngredientList({ ingredients, handleGetRecipe, setIngredients }) {

  function removeIngredient(index) {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div>

      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeIngredient(index)}>❌</button>
          </li>
        ))}
      </ul>

      <div className="action-buttons">
        
        <button onClick={handleGetRecipe}> Get Recipes </button>

        <button onClick={() => setIngredients([])}> Clear All</button>

      </div>
    </div>
  );
}

export default IngredientList;