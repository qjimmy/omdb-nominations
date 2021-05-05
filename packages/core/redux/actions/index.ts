import { NominationActions } from './nominations.actions';
import { SearchActions } from './search.action';

export * from './search.action';
export * from './nominations.actions';

export type AppActions = SearchActions | NominationActions;
