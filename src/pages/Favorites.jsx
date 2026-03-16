import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Favorites() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  function removeFavorite(id) {

  const updated = favorites.filter((item) => item.id !== id);

  setFavorites(updated);

  localStorage.setItem("favorites", JSON.stringify(updated));

}

  return (
    <div className="container">

      <h2>Your Favorite Recipes ❤️</h2>

      {favorites.length === 0 ? (
        <p>No favorite recipes yet</p>
      ) : (

        <div className="recipes-container">

          {favorites.map((recipe, index) => (

            <div key={index}>

              <RecipeCard recipe={recipe} />

              <button
                onClick={() => removeFavorite(recipe.id)}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  background: "#ff4d4d",
                  border: "none",
                  color: "white",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Remove ❌
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Favorites;