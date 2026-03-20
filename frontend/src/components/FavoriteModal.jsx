import { motion } from "framer-motion";

function FavoriteModal({ recipe, onConfirm, onCancel, isAlreadyFavorite }) {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="modal"
      onClick={onCancel}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="favorite-modal-content"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="favorite-modal-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h2>❤️ {isAlreadyFavorite ? "Already Favorited!" : "Add to Favorites"}</h2>
        </motion.div>

        <motion.div
          className="favorite-modal-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="favorite-modal-recipe">
            <img src={recipe.image || recipe.strMealThumb} alt={recipe.title || recipe.strMeal} />
            <h3>{recipe.title || recipe.strMeal}</h3>
          </div>

          <p className="favorite-modal-message">
            {isAlreadyFavorite 
              ? "This recipe is already in your favorites! 😄" 
              : "Are you sure you want to add this recipe to your favorites?"}
          </p>
        </motion.div>

        <motion.div
          className="favorite-modal-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {isAlreadyFavorite ? (
            <motion.button
              className="modal-btn modal-btn-primary"
              onClick={onCancel}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Close
            </motion.button>
          ) : (
            <>
              <motion.button
                className="modal-btn modal-btn-secondary"
                onClick={onCancel}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Cancel
              </motion.button>
              <motion.button
                className="modal-btn modal-btn-primary"
                onClick={onConfirm}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Add to Favorites
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default FavoriteModal;
