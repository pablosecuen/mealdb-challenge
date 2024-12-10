// src/hooks/usePagination.ts

import { useState, useEffect } from 'react';
import { Meal } from '../types/types';

interface UsePaginationProps {
  items: Meal[];
  itemsPerPage: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  currentItems: Meal[];
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}
/**
 * Custom hook to handle pagination of a list of items.
 *
 * @param {UsePaginationProps} param0 - Object containing the list of items and the number of items per page.
 * @returns {UsePaginationReturn} Object containing the pagination state and functions.
 *
 * @example
 * const { currentPage, totalPages, currentItems, goToPage, goToNextPage, goToPrevPage } = usePagination({
 *   items: meals,
 *   itemsPerPage: 6,
 * });
 */
const usePagination = ({
  items,
  itemsPerPage,
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [items, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    goToNextPage,
    goToPrevPage,
  };
};

export default usePagination;
