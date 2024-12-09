import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import MealList from './components/MealList';
import MealDetails from './components/MealsDetails';
import FavoritesList from './components/Favorites.List';
import { Sun, Moon } from 'lucide-react';

const queryClient = new QueryClient();

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'ingredient'>('name');
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className=' min-h-screen min-w-screen mx-auto px-4 py-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'>
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-4xl font-bold'>MealDB Recipe Finder</h1>
            <button
              onClick={toggleDarkMode}
              className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchType={searchType}
            setSearchType={setSearchType}
          />
          <FilterBar setCategory={setCategory} setArea={setArea} />
          <div className='flex flex-col md:flex-row gap-8'>
            <div className='w-full md:w-1/2'>
              <MealList
                searchTerm={searchTerm}
                searchType={searchType}
                setSelectedMealId={setSelectedMealId}
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
