import { useStoreView } from '../store/storeView';
import { useOperator } from '../store/operator';
import { Meal } from '../types/types';
import { Heart } from 'lucide-react';
import usePagination from '../hooks/usePagination';
import StatusMessage from './StatusMessage';
import PaginationControls from './Pagination';

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

  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    goToNextPage,
    goToPrevPage,
  } = usePagination({
    items: meals || [],
    itemsPerPage: 6,
  });

  const toggleFavorite = (e: React.MouseEvent, meal: Meal) => {
    e.stopPropagation(); // Prevent triggering the meal selection when actioning favorites icon
    const isFavorite = favorites?.some(
      (fav: Meal) => fav.idMeal === meal.idMeal
    );
    if (isFavorite) {
      operator.removeFromFavorites(meal.idMeal);
    } else {
      operator.addToFavorites(meal);
    }
  };

  return (
    <div>
      <StatusMessage
        isLoading={isLoading}
        isError={isError}
        hasData={meals && meals.length > 0}
      />

      {meals && meals.length > 0 && (
        <>
          <h2 className='text-2xl font-bold mb-4'>SEARCH RESULTS</h2>
          <div className='flex flex-wrap gap-4 min-h-[476px]'>
            {currentItems.map((meal: Meal) => {
              const isFavorite = favorites?.some(
                (fav: Meal) => fav.idMeal === meal.idMeal
              );
              return (
                <div
                  key={meal.idMeal}
                  className='w-56 border rounded p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 relative'
                  onClick={() => setSelectedMealId(meal.idMeal)}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className='w-full h-40 aspect-square object-cover mb-2 rounded'
                  />
                  <button
                    className='absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md'
                    onClick={(e) => toggleFavorite(e, meal)}
                    aria-label={
                      isFavorite
                        ? `Remove ${meal.strMeal} from favorites`
                        : `Add ${meal.strMeal} to favorites`
                    }
                  >
                    <Heart
                      size={20}
                      className={
                        isFavorite
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-500'
                      }
                    />
                  </button>
                  <h3 className='text-lg font-semibold'>{meal.strMeal}</h3>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              onNextPage={goToNextPage}
              onPrevPage={goToPrevPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MealList;
