import { store } from '@shopify/core';
import { SearchBarQueryInput } from '../redux/actions';

export class SearchBarService {
  static search(query: string) {
    store.dispatch(new SearchBarQueryInput(query));
  }
}
