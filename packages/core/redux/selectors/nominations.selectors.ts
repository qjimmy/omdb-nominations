import { createSelector, OutputSelector } from 'reselect';
import type { AppState, MovieMetadata, NominationState } from '@shopify/types';

export const getNominationList: OutputSelector<
  AppState,
  MovieMetadata[],
  (res: { [key: string]: MovieMetadata }) => MovieMetadata[]
> = createSelector<
  AppState,
  {
    [key: string]: MovieMetadata;
  },
  MovieMetadata[]
>(
  (state) => state.nominations.nominees,
  (nominees) => Object.values(nominees)
);

export const getNominationState: OutputSelector<
  AppState,
  {
    [key: string]: MovieMetadata;
  },
  (
    res: NominationState
  ) => {
    [key: string]: MovieMetadata;
  }
> = createSelector<
  AppState,
  NominationState,
  {
    [key: string]: MovieMetadata;
  }
>(
  (state: AppState) => state.nominations,
  (nominations) => nominations.nominees
);
