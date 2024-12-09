import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMealsByName = async (searchTerm: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/search.php?s=${searchTerm}`
  );
  return response.data.meals;
};

export const searchMealsByIngredient = async (ingredient: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/filter.php?i=${ingredient}`
  );
  return response.data.meals;
};

export const getMealDetails = async (mealId: string) => {
  const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${mealId}`);
  return response.data.meals[0];
};

export const getRandomMeal = async () => {
  const response = await axios.get(`${API_BASE_URL}/random.php`);
  return response.data.meals[0];
};

export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/list.php?c=list`);
  return response.data.meals;
};

export const getAreas = async () => {
  const response = await axios.get(`${API_BASE_URL}/list.php?a=list`);
  return response.data.meals;
};
