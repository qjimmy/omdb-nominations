import { NominationState } from '@shopify/types/state/nomination.state';
import {
  NOMINATE,
  NominationActions,
  REMOVE_NOMINATION,
  SET_NOMINATION,
} from '../actions';

const initialState = {};

export const nominations = (
  state: NominationState = initialState,
  action: NominationActions
): NominationState => {
  switch (action.type) {
    case NOMINATE: {
      return {
        ...state,
        [action.payload.imdbID]: action.payload,
      };
    }

    case REMOVE_NOMINATION: {
      const temp = state;
      delete temp[action.movieId];
      return {
        ...temp,
      };
    }

    case SET_NOMINATION: {
      return {
        ...action.nomination,
      };
    }

    default: {
      return { ...state };
    }
  }
};
