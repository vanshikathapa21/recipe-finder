import { Link } from "react-router-dom";

function Navbar({ favCount, toggleMode, darkMode }) {

  return (
    <nav className="navbar">
      <h2 className="logo">🍲 Khana Khazana</h2>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/favorites">Favorites ({favCount})</Link>
        </li>
      </ul>

      <button className="toggle-btn" onClick={toggleMode}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}

export default Navbar;