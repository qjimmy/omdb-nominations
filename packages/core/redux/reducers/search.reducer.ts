import type { SearchState } from '@shopify/types';
import { SearchStatus } from '@shopify/types';

import {
  SearchActions,
  SEARCH_BAR_QUERY,
  SEARCH_RESULTS_ERROR,
  SEARCH_RESULTS_FETCHING,
  SEARCH_RESULTS_FETCH_CANCEL,
  SEARCH_RESULTS_SUCCESS,
} from '../actions';

const initialState: SearchState = {
  loading: false,
  error: null,
  status: '',
  results: null,
  query: '',
};

export const search = (
  state: SearchState = initialState,
  action: SearchActions
): SearchState => {
  switch (action.type) {
    case SEARCH_BAR_QUERY: {
      return {
        ...state,
        query: action.query,
        status:
          action.query.length < 3
            ? SearchStatus.LongerQueryRequired
            : SearchStatus.Debouncing,
      };
    }

    case SEARCH_RESULTS_FETCHING: {
      return {
        ...state,
        loading: true,
        status: SearchStatus.Fetching,
      };
    }

    case SEARCH_RESULTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        status: '',
        results: action.results,
      };
    }

    case SEARCH_RESULTS_ERROR: {
      return {
        ...state,
        loading: false,
        status: action.error.message,
        error: action.error,
      };
    }

    case SEARCH_RESULTS_FETCH_CANCEL: {
      return {
        ...state,
        loading: false,
        status: action.status || state.status,
      };
    }

    default: {
      return { ...state };
    }
  }
};
