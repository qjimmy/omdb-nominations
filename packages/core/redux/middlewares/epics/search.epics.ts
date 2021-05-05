import { of, from, Observable } from 'rxjs';
import { combineEpics, Epic, StateObservable } from 'redux-observable';
import { ofType } from 'redux-observable';
import { AppState, IOmdbSearchResults, SearchStatus } from '@shopify/types';
import { OmdbSearchResults } from '@shopify/types';
import {
  CancelSearchResultFetch,
  SearchActions,
  SearchBarFetchingResults,
  SearchBarQueryInput,
  SearchBarResultError,
  SearchBarResultSuccess,
  SEARCH_BAR_QUERY,
  SEARCH_RESULTS_FETCHING,
} from '@shopify/core/redux/actions';

import {
  tap,
  map,
  filter,
  debounceTime,
  switchMap,
  catchError,
  pluck,
} from 'rxjs/operators';
import { HttpService } from '../../../services';

import { createStandaloneToast } from '@chakra-ui/react';

const alert = createStandaloneToast();

const searchQueryEpic: Epic = (
  action$: Observable<SearchActions>,
  store$: StateObservable<AppState>
): Observable<SearchActions> =>
  action$.pipe(
    ofType(SEARCH_RESULTS_FETCHING),
    // Avoid sending requests if empty query
    filter(() => store$.value.search.query.length > 2),
    switchMap((_action: SearchActions) =>
      from(
        HttpService.get<{ searchResults: IOmdbSearchResults }>(
          `/api/get-search-results`,
          {
            query: { query: store$.value.search.query },
          }
        )
      ).pipe(
        map(
          ({ searchResults }) =>
            new SearchBarResultSuccess({
              ...new OmdbSearchResults(searchResults),
            })
        ),
        catchError((error) => {
          alert({
            status: 'error',
            title: 'Error',
            description:
              error.message + ' Please try again or be more specific',
            position: 'top-left',
            isClosable: true,
          });

          return of(new SearchBarResultError({ ...error }));
        })
      )
    )
  );

const debounceSearchQueryEpic: Epic = (
  action$: Observable<SearchBarQueryInput>,
  _store$: StateObservable<AppState>
): Observable<SearchActions> =>
  action$.pipe(
    ofType(SEARCH_BAR_QUERY),
    pluck('query'),
    tap(() => alert.closeAll()),
    filter((query: string) => query.length > 2),
    debounceTime(800),
    switchMap(() => of(new SearchBarFetchingResults()))
  );

const catchLeakingFetchingActionEpic: Epic = (
  action$: Observable<SearchBarFetchingResults>,
  store$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(SEARCH_RESULTS_FETCHING),
    filter(() => store$.value.search.query.length < 3),
    switchMap(() =>
      of(
        new CancelSearchResultFetch(
          !store$.value.search.query.length
            ? ''
            : SearchStatus.LongerQueryRequired
        )
      )
    )
  );

export const searchEpics = combineEpics(
  searchQueryEpic,
  debounceSearchQueryEpic,
  catchLeakingFetchingActionEpic
);
