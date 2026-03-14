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

      <button onClick={handleGetRecipe}
         disabled={ingredients.length === 0}
         style={{
              backgroundColor: ingredients.length === 0 ? "gray" : "green",
              color: "white",
              cursor: ingredients.length === 0 ? "not-allowed" : "pointer"
  }}
>
  Get Recipes
</button>

      <button onClick={() => setIngredients([])}>
        Clear All
      </button>

    </div>
  );
}

export default IngredientList;