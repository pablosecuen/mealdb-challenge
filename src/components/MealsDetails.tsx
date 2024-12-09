import React from 'react';
import { useStoreView } from '../store/storeView';
import { useOperator } from '../store/operator';
import { IngredientItem, Meal } from '../types/types';

interface MealDetailsProps {
  mealId: string;
}

const MealDetails: React.FC<MealDetailsProps> = ({ mealId }) => {
  const { useMealDetails, useFavorites } = useStoreView();
  const { data: meal, isLoading, isError } = useMealDetails(mealId);
  const { data: favorites } = useFavorites();
  const operator = useOperator();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching meal details</div>;
  if (!meal) return <div>No meal found</div>;

  const isFavorite = favorites.some((fav: Meal) => fav.idMeal === meal.idMeal);

  const toggleFavorite = () => {
    if (isFavorite) {
      operator.removeFromFavorites(meal.idMeal);
    } else {
      operator.addToFavorites(meal);
    }
  };

  const ingredients: IngredientItem[] = Object.entries(meal)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => ({
      ingredient: value as string,
      measure: meal[`strMeasure${key.slice(13)}`] as string,
    }));

  return (
    <div className='bg-white shadow-md rounded-lg p-6 mb-8'>
      <div className='flex justify-between items-start mb-4'>
        <h2 className='text-2xl font-bold'>{meal.strMeal}</h2>
        <button
          onClick={toggleFavorite}
          className={`px-4 py-2 rounded ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className='w-full h-64 object-cover rounded-lg mb-4'
      />
      <p className='mb-4'>
        <span className='font-semibold'>Category:</span> {meal.strCategory} |{' '}
        <span className='font-semibold'>Area:</span> {meal.strArea}
      </p>
      <h3 className='text-xl font-semibold mb-2'>Ingredients:</h3>
      <ul className='list-disc list-inside mb-4'>
        {ingredients.map(
          (
            { ingredient, measure } // here we are using same ingridient as id, because it is more performant than using integraded id from map, and ingredients will never be duplicated
          ) => (
            <li key={ingredient}>
              {ingredient} - {measure}
            </li>
          )
        )}
      </ul>
      <h3 className='text-xl font-semibold mb-2'>Instructions:</h3>
      <p className='mb-4'>{meal.strInstructions}</p>
      {meal.strYoutube && (
        <div>
          <h3 className='text-xl font-semibold mb-2'>Video Tutorial:</h3>
          <iframe
            width='100%'
            height='315'
            src={`https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MealDetails;
