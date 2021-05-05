import { AppState } from '@shopify/types';
import { Observable, of } from 'rxjs';
import { Epic, StateObservable, ofType, combineEpics } from 'redux-observable';
import {
  AddNomination,
  NOMINATE,
  NominationActions,
} from '@shopify/core/redux/actions';
import { filter, switchMap, tap } from 'rxjs/operators';
import { createStandaloneToast } from '@chakra-ui/react';

const alert = createStandaloneToast();

const onNominationEpic: Epic = (
  action$: Observable<AddNomination>,
  store$: StateObservable<AppState>
): Observable<any> =>
  action$.pipe(
    ofType(NOMINATE),
    filter(() => Object.keys(store$.value.nominations).length <= 5),
    tap((action: AddNomination) =>
      alert({
        status: 'success',
        title: `${action.payload.Title} Nominated!`,
      })
    ),
    switchMap(() => of({ type: '[Nomination] Alert Nomination Success' })) // do something in future
  );

export const nominationEpics = combineEpics(onNominationEpic);
