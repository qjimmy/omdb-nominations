import { AppState, MovieRanking } from '@shopify/types';
import { from, Observable, of } from 'rxjs';
import { Epic, StateObservable, ofType, combineEpics } from 'redux-observable';
import {
  AllowRefreshRankings,
  RankingsFetchError,
  RankingsFetchLatest,
  RankingsFetchSuccess,
  RANKINGS_FETCH,
} from '@shopify/core/redux/actions';
import {
  catchError,
  debounce,
  debounceTime,
  map,
  switchMap,
} from 'rxjs/operators';
import { HttpService } from '@shopify/core/services';

const getLatestRankingsEpic: Epic = (
  action$: Observable<RankingsFetchLatest>,
  _store$: StateObservable<AppState>
): Observable<RankingsFetchError | RankingsFetchSuccess> =>
  action$.pipe(
    ofType(RANKINGS_FETCH),
    switchMap(() =>
      from(HttpService.get<Array<MovieRanking>>('/api/rankings/top')).pipe(
        map(
          (rankings: Array<MovieRanking>) => new RankingsFetchSuccess(rankings)
        ),
        catchError((error) => of(new RankingsFetchError({ ...error })))
      )
    )
  );

const preventSpamRefreshRankingsEpic: Epic = (
  action$: Observable<RankingsFetchLatest>,
  _store$: StateObservable<AppState>
): Observable<AllowRefreshRankings> =>
  action$.pipe(
    ofType(RANKINGS_FETCH),
    debounceTime(10000),
    map(() => new AllowRefreshRankings())
  );

export const rankingsEpic = combineEpics(
  getLatestRankingsEpic,
  preventSpamRefreshRankingsEpic
);
