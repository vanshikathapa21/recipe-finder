export async function getRecipes(ingredients) {

  const query = ingredients.join(",");

  const response = await fetch(
    `https://recipe-finder-qn7a.onrender.com/recipes?ingredients=${query}`
  );

  const data = await response.json();

  return data; 
}

export async function getRecipeDetails(id) {

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const data = await response.json();

  return data.meals[0];
}