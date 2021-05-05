import { createSelector, OutputSelector } from 'reselect';
import type { AppState, SearchState } from '@shopify/types';

export const getSearchState: OutputSelector<
  AppState,
  SearchState,
  (res: SearchState) => SearchState
> = createSelector<AppState, SearchState, SearchState>(
  (state) => state.search,
  (searchSlice) => searchSlice
);
