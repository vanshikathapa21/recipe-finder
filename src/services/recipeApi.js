export async function getRecipes(ingredients) {
  try {

     if (!ingredients || ingredients.length === 0) return [];

    const mainIngredient = ingredients[0]; 
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`
    );

    const data = await res.json();

    return data.meals || [];

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