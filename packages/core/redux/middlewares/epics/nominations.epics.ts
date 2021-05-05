import { AppState } from '@shopify/types';
import { Observable, of } from 'rxjs';
import { Epic, StateObservable, ofType, combineEpics } from 'redux-observable';
import {
  AddNomination,
  NOMINATE,
  RemoveNomination,
  REMOVE_NOMINATION,
  SetNomination,
  SET_NOMINATION,
} from '@shopify/core/redux/actions';
import { filter, switchMap, tap } from 'rxjs/operators';
import { createStandaloneToast } from '@chakra-ui/react';
import { LocalStorageService } from '@shopify/core/services';

const alert = createStandaloneToast();

const addNominationEpic: Epic = (
  action$: Observable<AddNomination>,
  store$: StateObservable<AppState>
): Observable<any> =>
  action$.pipe(
    ofType(NOMINATE),
    filter(() => Object.keys(store$.value.nominations).length <= 5),
    tap((action) => {
      LocalStorageService.setNominations({
        ...store$.value.nominations,
        [action.payload.imdbID]: action.payload,
      });
      alert.closeAll();
      alert({
        status: 'success',
        title: `${action.payload.Title} Nominated!`,
        position: 'top-left',
        isClosable: true,
      });
    }),
    switchMap(() =>
      of({ type: '[Nomination] Alert Nomination Success' }).pipe()
    )
  );

const clearNominationsEpic: Epic = (
  action$: Observable<SetNomination>,
  _store$: StateObservable<AppState>
): Observable<any> =>
  action$.pipe(
    ofType(SET_NOMINATION),
    filter((action) => !Object.keys(action.nomination).length),
    tap(() => {
      LocalStorageService.setNominations({});
    }),
    switchMap(() =>
      of({
        type: '[Nomination] Cleared Nominations',
      })
    )
  );

const removeNominationEpic: Epic = (
  action$: Observable<RemoveNomination>,
  store$: StateObservable<AppState>
): Observable<any> =>
  action$.pipe(
    ofType(REMOVE_NOMINATION),
    tap((action: RemoveNomination) => {
      const tempNominations = store$.value.nominations;
      delete tempNominations[action.movieId];
      LocalStorageService.setNominations({ ...tempNominations });
    }),
    switchMap(() =>
      of({
        type: '[Nomination] Removed Nomination',
      })
    )
  );

export const nominationEpics = combineEpics(
  addNominationEpic,
  clearNominationsEpic,
  removeNominationEpic
);
