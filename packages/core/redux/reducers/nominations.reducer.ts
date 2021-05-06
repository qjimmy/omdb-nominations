import { NominationState } from '@shopify/types/state/nomination.state';
import {
  CLEAR_NOMINATIONS,
  CLEAR_NOMINATIONS_ERROR,
  CLEAR_NOMINATIONS_SUCCESS,
  NOMINATE,
  NominationActions,
  REMOVE_NOMINATION,
  SET_NOMINATION,
} from '../actions';

const initialState = {
  loading: false,
  error: null,
  nominees: {},
};

export const nominations = (
  state: NominationState = initialState,
  action: NominationActions
): NominationState => {
  switch (action.type) {
    case NOMINATE: {
      return {
        ...state,
        nominees: {
          ...state.nominees,
          [action.payload.imdbID]: action.payload,
        },
      };
    }

    case REMOVE_NOMINATION: {
      const temp = state.nominees;
      delete temp[action.movieId];
      return {
        ...state,
        nominees: { ...temp },
      };
    }

    case SET_NOMINATION: {
      return {
        ...state,
        nominees: action.nomination,
      };
    }

    case CLEAR_NOMINATIONS: {
      return {
        ...state,
        loading: true,
      };
    }

    case CLEAR_NOMINATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        nominees: {},
      };
    }

    case CLEAR_NOMINATIONS_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }

    default: {
      return { ...state };
    }
  }
};
