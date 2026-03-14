import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { useState } from "react";
import Navbar from "./components/Navbar";
import "./styles/main.css";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>

      <div className={darkMode ? "dark" : "light"}>

        <Navbar />

        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle Mode
        </button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;