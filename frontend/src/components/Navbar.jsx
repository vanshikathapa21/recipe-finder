import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar({
  favCount,
  toggleMode,
  darkMode,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("favorites");
    setIsLoggedIn(false);
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
        staggerChildren: 0.08,
        delayChildren: 0.08,
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
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  };

  const goHome = () => navigate("/home");

  return (
    <motion.nav
      className="navbar"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="navbar-inner">
        <motion.div className="navbar-side navbar-side-left" variants={itemVariants}>
          <motion.button
            className="toggle-btn"
            onClick={toggleMode}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="toggle-btn-text">
              {darkMode ? "Light mode" : "Dark mode"}
            </span>
          </motion.button>

          {isLoggedIn && (
            <motion.button
              className="logout-btn"
              onClick={handleLogout}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Log out
            </motion.button>
          )}
        </motion.div>

        <motion.ul className="nav-links" variants={itemVariants}>
          <motion.li whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </motion.li>

          {isLoggedIn && (
            <motion.li whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
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
                  transition={{ type: "spring", stiffness: 300, damping: 14 }}
                >
                  {favCount}
                </motion.span>
              </NavLink>
            </motion.li>
          )}
        </motion.ul>

        <motion.div
          className="logo-container"
          variants={itemVariants}
          onClick={goHome}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              goHome();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className="brand-copy">
            <span className="brand-eyebrow">Smart Recipe Search</span>
            <h2 className="logo-text">Khana Khazana</h2>
          </div>

          <div className="brand-mark">
            <img src="/logo.png" alt="Khana Khazana logo" className="logo-img" />
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
