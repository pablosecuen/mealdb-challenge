interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

/**
 * PaginationControls component renders pagination buttons allowing users to navigate through pages.
 *
 * @param {PaginationControlsProps} props - Properties containing current page, total pages, and navigation functions.
 * @returns {JSX.Element} The rendered pagination controls.
 */
const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPrevPage,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='mt-8 flex justify-center items-center gap-2'>
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-label='Previous Page'
      >
        Previous
      </button>

      {pageNumbers.map((number, index) =>
        number === '...' ? (
          <span key={index} className='px-3 py-1'>
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(number as number)}
            className={`px-3 py-1 rounded ${
              currentPage === number
                ? 'bg-blue-700 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            aria-label={`Go to page ${number}`}
          >
            {number}
          </button>
        )
      )}

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-label='Next Page'
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
