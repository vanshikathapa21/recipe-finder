const express = require("express");
const router = express.Router();
const { saveRecipe, getFavorites, deleteFavorite } = require("../controllers/recepie");

router.post("/favorites",saveRecipe);
router.get("/favorites",getFavorites);
router.delete("/favorites/:id",deleteFavorite);

module.exports = router;