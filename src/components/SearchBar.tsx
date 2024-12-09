import React from 'react';
import { useStoreView } from '../store/storeView';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchType: 'name' | 'ingredient';
  setSearchType: (type: 'name' | 'ingredient') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
}) => {
  const { useRandomMeal } = useStoreView();
  const { data: randomMeal, refetch: fetchRandomMeal } = useRandomMeal();

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as 'name' | 'ingredient');
  };

  const handleRandomMeal = () => {
    fetchRandomMeal();
  };

  return (
    <div className='mb-8'>
      <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-4 w-full'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
