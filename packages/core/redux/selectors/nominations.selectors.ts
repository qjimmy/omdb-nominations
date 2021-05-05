import { createSelector, OutputSelector } from 'reselect';
import type { AppState, MovieMetadata, NominationState } from '@shopify/types';

export const getNominationList: OutputSelector<
  AppState,
  Array<MovieMetadata>,
  (res: NominationState) => Array<MovieMetadata>
> = createSelector<AppState, NominationState, Array<MovieMetadata>>(
  (state) => state.nominations,
  (nominations) => Object.values(nominations)
);

export const getNominationState: OutputSelector<
  AppState,
  NominationState,
  (res: NominationState) => NominationState
> = createSelector<AppState, NominationState, NominationState>(
  (state) => state.nominations,
  (nominations) => nominations
);
