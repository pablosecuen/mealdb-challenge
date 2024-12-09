import React from 'react';
import { useStoreView } from '../store/storeView';
import { Meal } from '../types/types';

const FavoritesList: React.FC = () => {
  const { useFavorites } = useStoreView();
  const { data: favorites } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return <div>No favorite meals yet</div>;
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Favorite Meals</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {favorites.map((meal: Meal) => (
          <div key={meal.idMeal} className='border rounded p-4'>
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
