const express = require("express");
const Recipe = require("../models/Recipe");

const saveRecipe = async (req, res) => {
    try {
        const { id, title, image } = req.body;
        console.log("Saving recipe:", { id, title, image, user: req.user.id });

        const newRecipe = new Recipe({
            id,
            title,
            image,
            user: req.user.id
        });

        await newRecipe.save();

        res.status(201).json({ message: "Recipe Saved ❤️" });
    } catch (error) {
        console.error("Error saving recipe:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const getFavorites = async (req, res) => {
    try {
        console.log("[recipeController.getFavorites] userId:", req.user.id);
        const favorites = await Recipe.find({ user: req.user.id });
        console.log("[recipeController.getFavorites] found favorites count:", favorites.length);
        console.log("[recipeController.getFavorites] favorites data:", favorites);
        res.json(favorites);
    } catch (error) {
        console.error("[recipeController.getFavorites] error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = { saveRecipe, getFavorites, deleteFavorite };