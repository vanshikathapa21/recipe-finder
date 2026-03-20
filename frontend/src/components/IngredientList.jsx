import { motion, AnimatePresence } from "framer-motion";

function IngredientList({ ingredients, handleGetRecipe, setIngredients }) {

  function removeIngredient(index) {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="popLayout">
        {ingredients.length > 0 && (
          <motion.ul
            className="ingredient-list"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {ingredients.map((item, index) => (
                <motion.li
                  className="ingredient-item"
                  key={item + index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span>{item}</span>

                  <motion.button
                    onClick={() => removeIngredient(index)}
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>

      <motion.div
        className="actions"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <motion.button
          onClick={handleGetRecipe}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Get Recipes
        </motion.button>
        <motion.button
          onClick={() => setIngredients([])}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Clear All
        </motion.button>
      </motion.div>

    </motion.div>
  );
}

export default IngredientList;