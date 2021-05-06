import { NominationActions } from './nominations.actions';
import { SearchActions } from './search.action';
import { RankingsActions } from './rankings.action';

export * from './search.action';
export * from './nominations.actions';
export * from './rankings.action';

export type AppActions = SearchActions | NominationActions | RankingsActions;
