export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const minCalories = searchParams.get("min") || "0";
  const maxCalories = searchParams.get("max") || "1000";
  const query = searchParams.get("query") || "";

  const apiKey = process.env.SPOONACULAR_API_KEY;

  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&number=24&minCalories=${minCalories}&maxCalories=${maxCalories}&apiKey=${apiKey}&query=${query}`,
  );

  const data = await res.json();

  const formatted = data.results.map((recipe: any) => {
    const nutrients = recipe.nutrition?.nutrients || [];

    const getNutrient = (name: string) =>
      nutrients.find((n: any) => n.name === name)?.amount || 0;

    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      calories: Math.round(getNutrient("Calories")),
      protein: Math.round(getNutrient("Protein")),
      fat: Math.round(getNutrient("Fat")),
      carbs: Math.round(getNutrient("Carbohydrates")),
    };
  });

  return Response.json(formatted);
}
