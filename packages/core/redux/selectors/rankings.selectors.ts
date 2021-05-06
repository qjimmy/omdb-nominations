import { createSelector, OutputSelector } from 'reselect';
import type { AppState, RankingsState } from '@shopify/types';

export const getRankingsState: OutputSelector<
  AppState,
  RankingsState,
  (res: RankingsState) => RankingsState
> = createSelector<AppState, RankingsState, RankingsState>(
  (state) => state.rankings,
  (rankingsSlice) => rankingsSlice
);
