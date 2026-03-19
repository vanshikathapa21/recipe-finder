import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./styles/main.css";

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavCount(favorites.length);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  function toggleMode() {
    setDarkMode(!darkMode);
  }

  return (
    <BrowserRouter>

      <div className="app">

        {}
        <Navbar 
          favCount={favCount} 
          toggleMode={toggleMode} 
          darkMode={darkMode}
        />

        <Routes>
          <Route 
            path="/" 
            element={<Home setFavCount={setFavCount} />} 
          />

          <Route 
            path="/favorites" 
            element={<Favorites setFavCount={setFavCount} />} 
          />
        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;