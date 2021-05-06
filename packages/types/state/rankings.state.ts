import type { MovieRanking } from '../api';

export interface RankingsState {
  loading: boolean;
  error: any;
  movies: Array<MovieRanking>;
  allowRefresh: boolean;
}
