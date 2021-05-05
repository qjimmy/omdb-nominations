import type { NominationState } from './nomination.state';
import type { SearchState } from './search.state';

export * from './search.state';
export * from './nomination.state';

export interface AppState {
  search: SearchState;
  nominations: NominationState;
}
