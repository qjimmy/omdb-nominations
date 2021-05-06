import type { MovieRanking } from '@shopify/types';
import { store } from '@shopify/core';
import { RankingsFetchLatest, SetRankings } from '@shopify/core/redux/actions';

export class RankingsService {
  static getLatestRankings() {
    store.dispatch(new RankingsFetchLatest());
  }

  static setRankings(rankings: Array<MovieRanking>) {
    store.dispatch(new SetRankings(rankings));
  }
}
