import type { OmdbSearchResults } from '@shopify/types';

export interface SearchState {
  loading: boolean;
  status?: string;
  error?: any;
  results: OmdbSearchResults | null;
  query?: string;
}

export enum SearchStatus {
  Debouncing = 'Waiting for you to finish typing...',
  Fetching = 'Fetching',
  LongerQueryRequired = 'At least 3 characters are needed',
}
