const express = require("express");
const Recipe = require("../models/Recipe");

const saveRecipe = async (req, res) => {
    try {
        const { id, title, image } = req.body;

        const newRecipe = new Recipe({
            id,
            title,
            image,
        });

        await newRecipe.save();

        res.status(201).json({ message: "Recipe Saved ❤️" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

const getFavorites = async (req, res) => {
    try {
        const favorites = await Recipe.find();
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

const deleteFavorite = async (req, res) => {
    try {
        await Recipe.deleteOne({ _id: req.params.id });
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = { saveRecipe, getFavorites, deleteFavorite };