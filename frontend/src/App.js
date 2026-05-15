import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

import "./styles/main.css";

import { Toaster} from "react-hot-toast";

function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  // Favorites count  
  const [favCount, setFavCount] = useState(0);



  // Initialize favorites count
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavCount(favorites.length);
  }, []);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("token")));
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

  return (
    <BrowserRouter>
      <div className="app">
        <Toaster position="top-right" />
        <Navbar
          favCount={favCount}
          toggleMode={toggleMode}
          darkMode={darkMode}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Home route */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home setFavCount={setFavCount} />
              </ProtectedRoute>
            }
          />

          {/* Protected Favorites route */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites setFavCount={setFavCount} />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
