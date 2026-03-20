export async function getRecipes(ingredients) {
  try {
    if (!ingredients || ingredients.length === 0) return [];

    // Pass all ingredients to backend, separated by commas
    const ingredientString = ingredients.join(",");
    
    const res = await fetch(
      `http://localhost:5000/recipes?ingredients=${encodeURIComponent(ingredientString)}`
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