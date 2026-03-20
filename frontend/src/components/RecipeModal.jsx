import { motion } from "framer-motion";

function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const ingredientVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  };

  return (
    <motion.div
      className="modal"
      onClick={onClose}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="modal-content"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />

        <div className="modal-body">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {recipe.strMeal}
          </motion.h2>

          {recipe?.strIngredients && recipe.strIngredients.length > 0 && (
            <>
              <h3>Ingredients</h3>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {recipe.strIngredients.map((ingredient, index) => (
                  <motion.li
                    key={index}
                    custom={index}
                    variants={ingredientVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {ingredient}
                  </motion.li>
                ))}
              </motion.ul>
            </>
          )}

          <h3>Instructions</h3>
          {recipe?.strInstructions ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {recipe.strInstructions.split("\r\n").map((step, index) => (
                step.trim() && (
                  <motion.p
                    key={index}
                    custom={index}
                    variants={ingredientVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ marginBottom: "12px", lineHeight: "1.6" }}
                  >
                    <strong>Step {index + 1}:</strong> {step}
                  </motion.p>
                )
              ))}
            </motion.div>
          ) : (
            <p>No steps available</p>
          )}

          <motion.button
            className="close-btn"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RecipeModal;