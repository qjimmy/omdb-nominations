import type { NominationState } from './nomination.state';
import type { SearchState } from './search.state';
import type { RankingsState } from './rankings.state';

export * from './search.state';
export * from './nomination.state';
export * from './rankings.state';

export interface AppState {
  search: SearchState;
  nominations: NominationState;
  rankings: RankingsState;
}
