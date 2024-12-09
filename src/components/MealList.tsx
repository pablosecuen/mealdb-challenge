import React from 'react';
import { useStoreView } from '../store/storeView';
import { Meal } from '../types/types';
import { Heart } from 'lucide-react';
import { useOperator } from '../store/operator';

interface MealListProps {
  searchTerm: string;
  searchType: 'name' | 'ingredient';
  setSelectedMealId: (id: string) => void;
  category: string;
  area: string;
}

const MealList: React.FC<MealListProps> = ({
  searchTerm,
  searchType,
  setSelectedMealId,
  category,
  area,
}) => {
  const { useMealSearch, useFavorites } = useStoreView();
  const operator = useOperator();
  const {
    data: meals,
    isLoading,
    isError,
  } = useMealSearch(searchTerm, searchType, category, area);
  const { data: favorites } = useFavorites();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching meals</div>;
  if (!meals) return <div>No meals found</div>;

  const toggleFavorite = (e: React.MouseEvent, meal: Meal) => {
    e.stopPropagation();
    const isFavorite = favorites.some(
      (fav: Meal) => fav.idMeal === meal.idMeal
    );
    if (isFavorite) {
      operator.removeFromFavorites(meal.idMeal);
    } else {
      operator.addToFavorites(meal);
    }
  };

  return (
    <div className='flex flex-wrap gap-4'>
      {meals.map((meal: Meal) => {
        const isFavorite = favorites.some(
          (fav: Meal) => fav.idMeal === meal.idMeal
        );
        return (
          <div
            key={meal.idMeal}
            className='w-56 border rounded mx-auto sm:mx-o p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 relative'
            onClick={() => setSelectedMealId(meal.idMeal)}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className='w-full h-40 aspect-square object-cover mb-2 rounded '
            />
            <button
              className='absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md'
              onClick={(e) => toggleFavorite(e, meal)}
            >
              <Heart
                size={20}
                className={
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'
                }
              />
            </button>
            <h3 className='text-lg font-semibold'>{meal.strMeal}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default MealList;
