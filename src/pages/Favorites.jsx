import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://recipe-finder-qn7a.onrender.com";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/favorites`);
      setFavorites(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavorite = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/favorites/${id}`);
      fetchFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>❤️ My Favorites</h2>

      <div className="recipes-container">
        {favorites.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>

            <button onClick={() => deleteFavorite(recipe._id)}>
              🗑 Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;