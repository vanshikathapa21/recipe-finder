import { API_BASE } from "../config/api";

export async function getRecipes(ingredients) {
  try {
    if (!ingredients || ingredients.length === 0) return [];

    const ingredientString = ingredients.join(",");
    
    // API_BASE includes /api at the end, so we replace it to get the root URL for /recipes
    const baseUrl = API_BASE.replace(/\/api$/, "");
    const res = await fetch(
      `${baseUrl}/recipes?ingredients=${encodeURIComponent(ingredientString)}`
    );

    const data = await res.json();

    return Array.isArray(data) ? data : [];

  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getRecipeDetails(id) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const data = await res.json();

    return data.meals ? data.meals[0] : null;
  } catch (err) {
    console.log(err);
    return null;
  }
}