import type { MovieRanking } from '@shopify/types';

export const RANKINGS_FETCH = '[Rankings] Fetching Latest Top Ranks';
export const RANKINGS_SUCCESS = '[Rankings] Fetching Rankings Success';
export const RANKINGS_ERROR = '[Rankings] Fetching Rankings Error';
export const SET_RANKINGS = '[Rankings] Set Rankings';
export const ALLOW_REFRESH_RANKINGS = '[Rankings] Refresh Rankings Now Allowed';

export class RankingsFetchLatest {
  readonly type = RANKINGS_FETCH;
}

export class RankingsFetchSuccess {
  readonly type = RANKINGS_SUCCESS;
  constructor(readonly movies: Array<MovieRanking>) {}
}

export class RankingsFetchError {
  readonly type = RANKINGS_ERROR;
  constructor(readonly error: any) {}
}

export class SetRankings {
  readonly type = SET_RANKINGS;
  constructor(readonly movies: Array<MovieRanking>) {}
}

export class AllowRefreshRankings {
  readonly type = ALLOW_REFRESH_RANKINGS;
}

export type RankingsActions =
  | RankingsFetchLatest
  | RankingsFetchSuccess
  | RankingsFetchError
  | SetRankings
  | AllowRefreshRankings;
