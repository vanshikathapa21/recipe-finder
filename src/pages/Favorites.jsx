import { useState, useEffect } from "react";

function Favorites() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <h1>❤️ My Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        favorites.map((recipe) => (
          <div key={recipe.idMeal}>
            <h3>{recipe.strMeal}</h3>
            <img src={recipe.strMealThumb} width="200" alt="" />
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
