import { useQuery } from 'react-query';
import { useOperator } from './operator';

export const useStoreView = () => {
  const operator = useOperator();

  const useMealSearch = (
    searchTerm: string,
    searchType: 'name' | 'ingredient',
    category: string,
    area: string
  ) => {
    return useQuery(
      ['mealSearch', searchTerm, searchType, category, area],
      () => operator.searchMeals(searchTerm, searchType, category, area),
      {
        enabled: !!searchTerm,
      }
    );
  };

  const useMealDetails = (mealId: string) => {
    return useQuery(
      ['mealDetails', mealId],
      () => operator.getMealDetails(mealId),
      {
        enabled: !!mealId,
      }
    );
  };

  const useRandomMeal = () => {
    return useQuery('randomMeal', operator.getRandomMeal);
  };

  const useCategories = () => {
    return useQuery('categories', operator.getCategories);
  };

  const useAreas = () => {
    return useQuery('areas', operator.getAreas);
  };

  const useFavorites = () => {
    return useQuery('favorites', () =>
      JSON.parse(localStorage.getItem('favorites') || '[]')
    );
  };

  return {
    useMealSearch,
    useMealDetails,
    useRandomMeal,
    useCategories,
    useAreas,
    useFavorites,
  };
};
