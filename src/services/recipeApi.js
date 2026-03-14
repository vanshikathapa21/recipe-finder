export async function getRecipes(ingredients){

  const query = ingredients.join(",");

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
  );

  const data = await response.json();

  if(!data.meals){
    return [];
  }

  return data.meals.map(meal => ({
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb
  }));
}

export async function getRecipeDetails(id){

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const data = await response.json();

  return data.meals[0];
}