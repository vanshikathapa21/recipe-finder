import { useState } from "react";

function IngredientsInput({ setIngredients }) {

  const [newIngredient, setNewIngredient] = useState("");

  function handleChange(e) {
    setNewIngredient(e.target.value);
  }

  function addIngredient() {
    if (newIngredient.trim() === "") return;

    setIngredients(prev => [...prev, newIngredient.toLowerCase().trim()]);

    setNewIngredient("");
  }

  return (
    <div className="input-box">
  <input
    type="text"
    placeholder="enter ingredient"
    value={newIngredient}
    onChange={(e) => setNewIngredient(e.target.value)}
  />

  <button>
    Add Ingredient
  </button>
    </div>
  );
}

export default IngredientsInput;