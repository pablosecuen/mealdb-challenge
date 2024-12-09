import { useQueryClient } from 'react-query';
import * as abstractor from './abstractor';
import { Meal } from '../types/types';

export const useOperator = () => {
  const queryClient = useQueryClient();

  const searchMeals = async (
    searchTerm: string,
    searchType: 'name' | 'ingredient',
    category?: string,
    area?: string
  ): Promise<Meal[]> => {
    let meals: Meal[];

    if (searchType === 'name') {
      meals = await abstractor.searchMealsByName(searchTerm);
    } else {
      meals = await abstractor.searchMealsByIngredient(searchTerm);
    }
    if (category) {
      meals = meals.filter((meal) => meal.strCategory === category);
    }
    if (area) {
      meals = meals.filter((meal) => meal.strArea === area);
    }

    return meals;
  };

  const getMealDetails = async (mealId: string) => {
    return abstractor.getMealDetails(mealId);
  };

  const getRandomMeal = async () => {
    return abstractor.getRandomMeal();
  };

  const getCategories = async () => {
    return abstractor.getCategories();
  };

  const getAreas = async () => {
    return abstractor.getAreas();
  };

  const addToFavorites = (meal: Meal) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = [...favorites, meal];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    queryClient.invalidateQueries('favorites');
  };

  const removeFromFavorites = (mealId: string) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter(
      (fav: Meal) => fav.idMeal !== mealId
    );
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    queryClient.invalidateQueries('favorites');
  };

  return {
    searchMeals,
    getMealDetails,
    getRandomMeal,
    getCategories,
    getAreas,
    addToFavorites,
    removeFromFavorites,
  };
};
