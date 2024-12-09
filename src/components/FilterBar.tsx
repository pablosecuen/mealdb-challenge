import React from 'react';
import { useStoreView } from '../store/storeView';
import { Area, Category } from '../types/types';

interface FilterBarProps {
  setCategory: (category: string) => void;
  setArea: (area: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ setCategory, setArea }) => {
  const { useCategories, useAreas } = useStoreView();
  const { data: categories } = useCategories() as { data?: Category[] };
  const { data: areas } = useAreas() as { data?: Area[] };

  return (
    <div className='flex gap-4 mb-4'>
      <select
        onChange={(e) => setCategory(e.target.value)}
        className='p-2 border rounded'
      >
        <option value=''>All Categories</option>
        {categories?.map((category) => (
          <option key={category.strCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => setArea(e.target.value)}
        className='p-2 border rounded'
      >
        <option value=''>All Areas</option>
        {areas?.map((area) => (
          <option key={area.strArea} value={area.strArea}>
            {area.strArea}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
