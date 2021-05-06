import { MovieMetadata } from '@shopify/types';
import { store } from '@shopify/core/redux';
import * as NominationActions from '@shopify/core/redux/actions/nominations.actions';

export class NominationService {
  static nominate(movie: MovieMetadata) {
    store.dispatch(new NominationActions.AddNomination(movie));
  }

  static remove(movieId: string) {
    store.dispatch(new NominationActions.RemoveNomination(movieId));
  }

  static setNominationState(state: { [key: string]: MovieMetadata }) {
    store.dispatch(new NominationActions.SetNomination(state));
  }

  static clearNominations() {
    store.dispatch(new NominationActions.ClearNominations());
  }
}
