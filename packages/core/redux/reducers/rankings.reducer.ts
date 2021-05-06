import type { RankingsState } from '@shopify/types';

import {
  ALLOW_REFRESH_RANKINGS,
  RankingsActions,
  RANKINGS_ERROR,
  RANKINGS_FETCH,
  RANKINGS_SUCCESS,
  SET_RANKINGS,
} from '../actions';

const initialState: RankingsState = {
  loading: false,
  allowRefresh: true,
  error: null,
  movies: [],
};

export const rankings = (
  state: RankingsState = initialState,
  action: RankingsActions
): RankingsState => {
  switch (action.type) {
    case RANKINGS_FETCH: {
      return {
        ...state,
        loading: true,
        allowRefresh: false,
      };
    }

    case RANKINGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        movies: action.movies,
      };
    }

    case RANKINGS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case SET_RANKINGS: {
      return {
        ...state,
        movies: action.movies,
      };
    }

    case ALLOW_REFRESH_RANKINGS: {
      return {
        ...state,
        allowRefresh: true,
      };
    }

    default: {
      return { ...state };
    }
  }
};
