import {
  ActionsObservable,
  combineEpics,
  Epic,
  StateObservable,
} from 'redux-observable';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from '@shopify/types';
import { AppActions } from '@shopify/core/redux/actions';
import { searchEpics } from './search.epics';
import { nominationEpics } from './nominations.epics';
import { rankingsEpic } from './rankings.epics';

export const rootEpic: Epic<AppActions, AppActions, AppState, any> = (
  action$: ActionsObservable<AppActions>,
  state$: StateObservable<AppState>,
  dependencies
) =>
  combineEpics(searchEpics, nominationEpics, rankingsEpic)(
    action$,
    state$,
    dependencies
  ).pipe(
    catchError((error: any, source: Observable<any>) => {
      console.error(error);
      return source;
    })
  );
