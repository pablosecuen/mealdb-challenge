// src/components/FilterBar.tsx

import React from 'react';
import { Action } from '../types/types';

interface FilterBarProps {
  category: string;
  area: string;
  dispatch: React.Dispatch<Action>;
}

const FilterBar: React.FC<FilterBarProps> = ({ category, area, dispatch }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_CATEGORY', payload: e.target.value });
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_AREA', payload: e.target.value });
  };

  return (
    <div className='mb-4 flex gap-4'>
      <select
        value={category}
        onChange={handleCategoryChange}
        className='p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white'
      >
        <option value=''>All Categories</option>
        <option value='Beef'>Beef</option>
        <option value='Chicken'>Chicken</option>
        <option value='Dessert'>Dessert</option>
        <option value='Vegetarian'>Vegetarian</option>
      </select>
      <select
        value={area}
        onChange={handleAreaChange}
        className='p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white'
      >
        <option value=''>All Areas</option>
        <option value='American'>American</option>
        <option value='British'>British</option>
        <option value='Canadian'>Canadian</option>
        <option value='Chinese'>Chinese</option>
      </select>
    </div>
  );
};

export default FilterBar;
