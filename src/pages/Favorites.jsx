import { useEffect, useState } from "react";

function Favorites({ setFavCount }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);

    if (setFavCount) {
      setFavCount(saved.length);
    }
  }, []);

  // ❌ remove from favorites
  function removeFromFavorites(id) {
    let updated = favorites.filter((item) => item.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavCount(updated.length);
  }

  return (
    <div className="container">
      <h2>Your Favorites ❤️</h2>

      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="recipes-container">
          {favorites.map((recipe) => (
            <div className="recipe-card" key={recipe.idMeal}>
              
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />

              <h3>{recipe.strMeal}</h3>

              <button onClick={() => removeFromFavorites(recipe.idMeal)}>
                ❌ Remove
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;