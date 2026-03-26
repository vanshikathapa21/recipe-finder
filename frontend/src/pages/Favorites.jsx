import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Favorites({ setFavCount }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_BASE}/api/favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavorites(res.data);

      if (setFavCount) {
        setFavCount(res.data.length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchFavorites();
}, [setFavCount]);

const removeFromFavorites = useCallback(async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_BASE}/api/favorites/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     setFavorites((prev) => prev.filter((item) => item._id !== id));

      if (setFavCount) {
        setFavCount((prev) => prev - 1);
      }
    } catch (err) {
      console.log(err);
    }
  }, [setFavCount]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "40px", fontSize: "32px", fontWeight: "700" }}
      >
        Your Favorites ❤️
      </motion.h2>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#999",
            fontSize: "18px",
          }}
        >
          <motion.p
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            No favorites added yet. Start adding recipes! 🍲
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          className="recipes-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {favorites.map((recipe) => (
              <motion.div
                className="recipe-card"
                key={recipe._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
              >
                <img
                  src={recipe.image || recipe.strMealThumb}
                  alt={recipe.title || recipe.strMeal}
                />

                <h3>{recipe.title || recipe.strMeal}</h3>

                <div style={{ padding: "0 16px 16px" }}>
                  <motion.button
                    className="favorite-btn"
                    style={{ width: "100%" }}
                    onClick={() => removeFromFavorites(recipe._id)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    ✕ Remove from Favorites
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default Favorites;