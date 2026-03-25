const express = require("express");
const router = express.Router();
const { saveRecipe, getFavorites, deleteFavorite } = require("../controllers/recepie");
const auth = require("../middleware/authMiddleware");

router.post("/favorites",auth,saveRecipe);
router.get("/favorites",getFavorites);
router.delete("/favorites/:id",deleteFavorite);

module.exports = router;