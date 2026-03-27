import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar({ favCount, toggleMode, darkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.08 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.nav
      className="navbar"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
  className="logo-container"
  variants={itemVariants}
  onClick={() => navigate("/home")}
  style={{ cursor: "pointer" }}
>
  <img src="/logo.png" alt="logo" className="logo-img" />
  <h2 className="logo-text">Khana Khazana</h2>
</motion.div>

      {/* 🔗 Links */}
      <motion.ul className="nav-links" variants={itemVariants}>
        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </motion.li>

        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Favorites
            <motion.span
              className="fav-count"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {favCount}
            </motion.span>
          </NavLink>
        </motion.li>
      </motion.ul>

      {/* Actions */}
      <div className="nav-actions">
        <motion.button
          className="toggle-btn"
          onClick={toggleMode}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? "☀" : "☽"}
        </motion.button>

        <motion.button
          className="logout-btn"
          onClick={handleLogout}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  );
}

export default Navbar;