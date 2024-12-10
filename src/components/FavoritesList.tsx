import React from 'react';
import { useStoreView } from '../store/storeView';
import { Meal } from '../types/types';

const FavoritesList: React.FC = () => {
  const { useFavorites } = useStoreView();
  const { data: favorites } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return (
      <div className='text-gray-600 dark:text-gray-400'>
        No favorite meals yet
      </div>
    );
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Favorite Meals</h2>
      <div className='flex flex-wrap gap-4 xs:mx-auto sm:mx-start'>
        {favorites.map((meal: Meal) => (
          <div
            key={meal.idMeal}
            className='border rounded p-4 w-56 dark:border-gray-600 cursor-pointer  mx-auto sm:mx-0'
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className='w-full h-40 object-cover mb-2 rounded'
            />
            <h3 className='text-lg font-semibold'>{meal.strMeal}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
