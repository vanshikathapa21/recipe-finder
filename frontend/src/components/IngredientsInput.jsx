import { useState } from "react";
import { motion } from "framer-motion";

function IngredientsInput({ setIngredients }) {
  const [newIngredient, setNewIngredient] = useState("");

  const handleChange = (e) => {
    setNewIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim() === "") return;

    setIngredients((prev) => [...prev, newIngredient.toLowerCase().trim()]);

    setNewIngredient("");
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="input-box"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.input
        type="text"
        placeholder="🥘 Enter ingredient (e.g., chicken, garlic)"
        value={newIngredient}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddIngredient();
          }
        }}
        whileFocus={{ scale: 1.02 }}
      />

      <motion.button
        onClick={handleAddIngredient}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Add Ingredient
      </motion.button>
    </motion.div>
  );
}

export default IngredientsInput;