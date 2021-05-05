import { Store, createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { classToJsObject, rootEpic } from './middlewares';
import { createEpicMiddleware } from 'redux-observable';
import { AppActions } from './actions';
import { AppState } from '@shopify/types';
import { search, nominations } from './reducers';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const epicMiddleware = createEpicMiddleware<
  AppActions,
  AppActions,
  AppState,
  any
>();

export const store: Store<AppState, AppActions> = createStore<
  AppState,
  AppActions,
  any,
  any
>(
  combineReducers({ search, nominations }),
  composeWithDevTools(applyMiddleware(epicMiddleware, classToJsObject))
);

const epic$ = new BehaviorSubject(rootEpic);

const hotReloadingEpic = (...args) =>
  // @ts-ignore
  epic$.pipe(switchMap((epic) => epic(...args)));

export const configureEpic = () => {
  epicMiddleware.run(hotReloadingEpic);
};

if (module.hot) {
  module.hot.accept('./middlewares', () => {
    const nextRootEpic = require('./middlewares').rootEpic;
    epic$.next(nextRootEpic);
  });
}
