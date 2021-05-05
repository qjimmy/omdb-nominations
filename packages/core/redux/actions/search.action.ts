import { SearchStatus } from '@shopify/types';
import { OmdbSearchResults } from '@shopify/types/api/omdb';

export const SEARCH_BAR_QUERY = '[Search Bar] New Query Input On Searchbar';
export const SEARCH_RESULTS_FETCHING = '[Search Bar] Fetching Results';
export const SEARCH_RESULTS_SUCCESS = '[Search Bar] Search Result Success';
export const SEARCH_RESULTS_ERROR = '[Search Bar] Search Result Error';
export const SEARCH_RESULTS_FETCH_CANCEL =
  '[Search Bar] Search Results Fetch Request Cancelled';

export class SearchBarQueryInput {
  readonly type = SEARCH_BAR_QUERY;
  constructor(readonly query: string) {}
}

export class SearchBarFetchingResults {
  readonly type = SEARCH_RESULTS_FETCHING;
}

export class SearchBarResultSuccess {
  readonly type = SEARCH_RESULTS_SUCCESS;
  constructor(readonly results: OmdbSearchResults) {}
}

export class SearchBarResultError {
  readonly type = SEARCH_RESULTS_ERROR;
  constructor(readonly error: any) {}
}

export class CancelSearchResultFetch {
  readonly type = SEARCH_RESULTS_FETCH_CANCEL;
  constructor(readonly status: SearchStatus | '') {}
}

export type SearchActions =
  | SearchBarQueryInput
  | SearchBarFetchingResults
  | SearchBarResultSuccess
  | SearchBarResultError
  | CancelSearchResultFetch;
