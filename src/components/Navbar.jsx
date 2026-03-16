import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

  const [count, setCount] = useState(0);

  useEffect(() => {

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    setCount(favorites.length);

  }, []);

  return (
    <nav className="navbar">
      <div className="logo">🍲 Khana Khazana</div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/favorites">
            Favorites ({count})
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;