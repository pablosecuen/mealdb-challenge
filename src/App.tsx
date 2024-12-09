import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import MealList from './components/MealList';
import MealDetails from './components/MealsDetails';
import FavoritesList from './components/Favorites.List';

const queryClient = new QueryClient();

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'ingredient'>('name');
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold mb-8 text-center'>
          MealDB Recipe Finder
        </h1>
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
    </QueryClientProvider>
  );
}

export default App;
