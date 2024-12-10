import { useStoreView } from '../store/storeView';
import { Action } from '../types/types';
import { SET_SEARCH_TERM, SET_SEARCH_TYPE } from '../constants/constants';

interface SearchBarProps {
  searchTerm: string;
  searchType: 'name' | 'ingredient';
  dispatch: React.Dispatch<Action>;
}

/**
 * SearchBar component allows users to search for meals by name or ingredient
 * and fetch a random meal.
 *
 * @param {SearchBarProps} props - Props containing search term, search type, and dispatch function.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  searchType,
  dispatch,
}: SearchBarProps): JSX.Element => {
  const { useRandomMeal } = useStoreView();
  const { data: randomMeal, refetch: fetchRandomMeal } = useRandomMeal();

  /**
   * Handles the change in search type (name or ingredient).
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - Change event from the select input.
   */
  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: SET_SEARCH_TYPE,
      payload: e.target.value as 'name' | 'ingredient',
    });
  };

  const handleRandomMeal = () => {
    fetchRandomMeal();
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SET_SEARCH_TERM,
      payload: e.target.value,
    });
  };

  return (
    <div className='mb-8'>
      <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-4 w-full'>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder={`Search by ${searchType}`}
          className='flex-grow p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white'
        />
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className='p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white'
        >
          <option value='name'>Name</option>
          <option value='ingredient'>Ingredient</option>
        </select>
        <button
          onClick={handleRandomMeal}
          className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
          aria-label='Fetch a Random Meal'
        >
          Surprise Me!
        </button>
      </div>
      {randomMeal && (
        <div className='bg-gray-100 dark:bg-gray-700 p-4 rounded'>
          <h3 className='text-xl font-bold mb-2'>
            Random Meal: {randomMeal.strMeal}
          </h3>
          <p>{randomMeal.strInstructions.slice(0, 100)}...</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
