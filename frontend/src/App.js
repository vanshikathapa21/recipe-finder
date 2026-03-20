import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import "./styles/main.css";

function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);
  const [favCount, setFavCount] = useState(0);

  // Shared state for Home page
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [favoriteModalRecipe, setFavoriteModalRecipe] = useState(null);

  // Initialize favorites count
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavCount(favorites.length);
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  // Shared state setters
  const sharedState = {
    ingredients,
    setIngredients,
    recipes,
    setRecipes,
    loading,
    setLoading,
    error,
    setError,
    selectedRecipe,
    setSelectedRecipe,
    hasSearched,
    setHasSearched,
    favoriteModalRecipe,
    setFavoriteModalRecipe,
    setFavCount,
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar 
          favCount={favCount} 
          toggleMode={toggleMode} 
          darkMode={darkMode}
        />

        <Routes>
          <Route 
            path="/" 
            element={<Home {...sharedState} />} 
          />

          <Route 
            path="/favorites" 
            element={<Favorites {...sharedState} />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;