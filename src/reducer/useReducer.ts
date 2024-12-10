import {
  RESET_STATE,
  SET_AREA,
  SET_CATEGORY,
  SET_SEARCH_TERM,
  SET_SEARCH_TYPE,
  SET_SELECTED_MEAL_ID,
} from '../constants/constants';
import { Action, AppState } from '../types/types';

export const initialState: AppState = {
  searchTerm: '',
  searchType: 'name',
  selectedMealId: null,
  category: '',
  area: '',
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case SET_SEARCH_TYPE:
      return { ...state, searchType: action.payload };
    case SET_SELECTED_MEAL_ID:
      return { ...state, selectedMealId: action.payload };
    case SET_CATEGORY:
      return { ...state, category: action.payload };
    case SET_AREA:
      return { ...state, area: action.payload };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
