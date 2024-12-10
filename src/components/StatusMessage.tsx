// src/components/StatusMessage.tsx

import React from 'react';
import { ERROR_FETCHING, LOADING, NO_MEAL_FOUND } from '../constants/constants';

interface StatusMessageProps {
  isLoading?: boolean;
  isError?: boolean;
  hasData?: boolean;
  loadingMessage?: string;
  errorMessage?: string;
  noDataMessage?: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
  isLoading = false,
  isError = false,
  hasData = true,
  loadingMessage = LOADING,
  errorMessage = ERROR_FETCHING,
  noDataMessage = NO_MEAL_FOUND,
}) => {
  if (isLoading) {
    return (
      <div className='text-center text-gray-600 dark:text-gray-400'>
        {loadingMessage}
      </div>
    );
  }

  if (isError) {
    return <div className='text-center text-red-500'>{errorMessage}</div>;
  }

  if (!hasData) {
    return (
      <div className='text-center text-gray-600 dark:text-gray-400'>
        {noDataMessage}
      </div>
    );
  }

  return null;
};

export default StatusMessage;
