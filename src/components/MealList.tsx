import React from 'react';
import { useStoreView } from '../store/storeView';
import { Meal } from '../types/types';

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
  const { useMealSearch } = useStoreView();
  const {
    data: meals,
    isLoading,
    isError,
  } = useMealSearch(searchTerm, searchType, category, area);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching meals</div>;
  if (!meals) return <div>No meals found</div>;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {meals.map(
        (
          meal: Meal // mealId, already has a unique identifier, no need for map index arg
        ) => (
          <div
            key={meal.idMeal}
            className='border rounded p-4 cursor-pointer hover:bg-gray-100'
            onClick={() => setSelectedMealId(meal.idMeal)}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className='w-full h-40 object-cover mb-2 rounded'
            />
            <h3 className='text-lg font-semibold'>{meal.strMeal}</h3>
          </div>
        )
      )}
    </div>
  );
};

export default MealList;
