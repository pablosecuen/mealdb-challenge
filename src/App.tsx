// src/App.tsx

import React, { useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import MealList from './components/MealList';
import MealDetails from './components/MealsDetails';
import FavoritesList from './components/FavoritesList';
import { Sun, Moon } from 'lucide-react';
import useDebounce from './hooks/useDebounce';
import useDarkMode from './hooks/useDarkMode';
import { initialState, reducer } from './reducer/useReducer';
import { Action, AppState } from './types/types';
import { SET_SELECTED_MEAL_ID } from './constants/constants';

const queryClient = new QueryClient();

/**
 * The App component serves as the root of the MealDB Recipe Finder application.
 * It integrates various functionalities, including dark mode toggling, search with debouncing,
 * filtering, displaying meal lists and details, and managing favorites.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App(): JSX.Element {
  // Initialize the useReducer hook with the reducer and initial state
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );

  const { searchTerm, searchType, selectedMealId, category, area } = state;
  const [darkMode, toggleDarkMode] = useDarkMode(false);

  // Debounce the search term to optimize performance
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  /**
   * Handler to set the selected meal ID.
   * Dispatches an action to update the selectedMealId in the state.
   *
   * @param {string} id - The ID of the selected meal.
   */
  const handleSetSelectedMealId = (id: string) => {
    dispatch({ type: SET_SELECTED_MEAL_ID, payload: id });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className='min-h-screen min-w-screen mx-auto px-4 py-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'>
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-4xl font-bold'>MealDB Recipe Finder</h1>
            <button
              onClick={toggleDarkMode}
              className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              aria-label='Toggle Dark Mode'
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            searchType={searchType}
            dispatch={dispatch}
          />
          <FilterBar category={category} area={area} dispatch={dispatch} />

          <div className='flex flex-col md:flex-row gap-8'>
            <div className='w-full md:w-1/2'>
              <MealList
                searchTerm={debouncedSearchTerm}
                searchType={searchType}
                setSelectedMealId={handleSetSelectedMealId}
                category={category}
                area={area}
              />
            </div>
            <div className='w-full md:w-1/2'>
              {selectedMealId && <MealDetails mealId={selectedMealId} />}
              <FavoritesList />
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
