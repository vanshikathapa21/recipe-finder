import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar({ favCount, toggleMode, darkMode }) {
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
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.nav
      className="navbar"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="logo" variants={itemVariants}>
        🍲 Khana Khazana
      </motion.h2>

      <motion.ul className="nav-links" variants={itemVariants}>
        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/">Home</Link>
        </motion.li>

        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/favorites">
            Favorites{" "}
            <motion.span
              key={favCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              ({favCount})
            </motion.span>
          </Link>
        </motion.li>
      </motion.ul>

      <motion.button
        className="toggle-btn"
        onClick={toggleMode}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.span
          key={darkMode ? "dark" : "light"}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </motion.span>
      </motion.button>
    </motion.nav>
  );
}

export default Navbar;