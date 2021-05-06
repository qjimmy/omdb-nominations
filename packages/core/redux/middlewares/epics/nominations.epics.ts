import { AppState } from '@shopify/types';
import { from, Observable, of } from 'rxjs';
import { Epic, StateObservable, ofType, combineEpics } from 'redux-observable';
import {
  AddNomination,
  ClearNominationError,
  ClearNominations,
  ClearNominationsSuccess,
  CLEAR_NOMINATIONS,
  NOMINATE,
  RemoveNomination,
  REMOVE_NOMINATION,
} from '@shopify/core/redux/actions';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { createStandaloneToast } from '@chakra-ui/react';
import { HttpService, LocalStorageService } from '@shopify/core/services';
import { MAX_NOMINATIONS } from '@shopify/utils';

const alert = createStandaloneToast();

const addNominationEpic: Epic = (
  action$: Observable<AddNomination>,
  store$: StateObservable<AppState>
): Observable<any> =>
  action$.pipe(
    ofType(NOMINATE),
    filter(
      () =>
        Object.keys(store$.value.nominations.nominees).length <= MAX_NOMINATIONS
    ),
    tap((action) => {
      LocalStorageService.setNominations({
        ...store$.value.nominations.nominees,
        [action.payload.imdbID]: action.payload,
      });
      alert.closeAll();
      alert(
        Object.keys(store$.value.nominations.nominees).length ===
          MAX_NOMINATIONS
          ? {
              status: 'success',
              title: 'Maximum Reached 🎉',
              description: `Congratulations! You've nominated the maximum of 5 movies/series!`,
              position: 'top',
              isClosable: true,
            }
          : {
              status: 'success',
              title: `${action.payload.Title} Nominated!`,
              position: 'top',
              isClosable: true,
            }
      );
    }),
    switchMap((action) =>
      from(
        HttpService.put('/api/nominations/add', {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...action.payload }),
        })
      ).pipe(
        map(() => ({ type: '[Nomination] Alert Nomination Success' })),
        catchError((error) =>
          of({
            type: '[Nomination] Add Nomination Error',
            payload: { ...error },
          })
        )
      )
    )
  );

const clearNominationsEpic: Epic = (
  action$: Observable<ClearNominations>,
  store$: StateObservable<AppState>
): Observable<any> =>
  action$.pipe(
    ofType(CLEAR_NOMINATIONS),
    filter(() => !!Object.keys(store$.value.nominations.nominees).length),
    tap(() => {
      LocalStorageService.setNominations({});
    }),
    switchMap(() =>
      from(
        HttpService.put('/api/nominations/clear', {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.keys(store$.value.nominations.nominees)),
        })
      ).pipe(
        map(() => new ClearNominationsSuccess()),
        catchError((error) => of(new ClearNominationError(error)))
      )
    )
  );

const removeNominationEpic: Epic = (
  action$: Observable<RemoveNomination>,
  store$: StateObservable<AppState>
): Observable<any> =>
  action$.pipe(
    ofType(REMOVE_NOMINATION),
    tap((action: RemoveNomination) => {
      const tempNominations = store$.value.nominations.nominees;
      delete tempNominations[action.movieId];
      LocalStorageService.setNominations({ ...tempNominations });
    }),
    switchMap(({ movieId }: RemoveNomination) =>
      from(
        HttpService.put('/api/nominations/remove', {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imdbID: movieId }),
        })
      ).pipe(
        map(() => ({
          type: '[Nomination] Removed Nomination',
        })),
        catchError((error) =>
          of({
            type: '[Nomination] Removed Nomination Error',
            payload: { ...error },
          })
        )
      )
    )
  );

export const nominationEpics = combineEpics(
  addNominationEpic,
  clearNominationsEpic,
  removeNominationEpic
);
