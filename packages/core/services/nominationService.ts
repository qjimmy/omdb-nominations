import { MovieMetadata } from '@shopify/types';
import { store } from '@shopify/core/redux';
import {
  AddNomination,
  RemoveNomination,
  SetNomination,
} from '@shopify/core/redux/actions';

export class NominationService {
  static nominate(movie: MovieMetadata) {
    store.dispatch(new AddNomination(movie));
  }

  static remove(movieId: string) {
    store.dispatch(new RemoveNomination(movieId));
  }

  static setNominationState(state: { [key: string]: MovieMetadata }) {
    store.dispatch(new SetNomination(state));
  }
}
