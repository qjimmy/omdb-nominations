import { MovieMetadata } from '@shopify/types/api/omdb';
import { NominationState } from '@shopify/types/state/nomination.state';

export const NOMINATE = '[Nominations] Nomination Selected';
export const REMOVE_NOMINATION = '[Nominations] Removed Nomination';
export const SET_NOMINATION = '[Nominations] Set Nomination';
export const CLEAR_NOMINATIONS = '[Nominations] Clear Nominations';
export const CLEAR_NOMINATIONS_SUCCESS =
  '[Nominations] Clear Nominations Success';
export const CLEAR_NOMINATIONS_ERROR =
  '[Nominations] Error Clearing Nominations';

export class AddNomination {
  readonly type = NOMINATE;
  constructor(readonly payload: MovieMetadata) {}
}

export class RemoveNomination {
  readonly type = REMOVE_NOMINATION;
  constructor(readonly movieId: string) {}
}

export class SetNomination {
  readonly type = SET_NOMINATION;
  constructor(readonly nomination: { [key: string]: MovieMetadata }) {}
}

export class ClearNominations {
  readonly type = CLEAR_NOMINATIONS;
}

export class ClearNominationsSuccess {
  readonly type = CLEAR_NOMINATIONS_SUCCESS;
}

export class ClearNominationError {
  readonly type = CLEAR_NOMINATIONS_ERROR;
  constructor(readonly payload: any) {}
}

export type NominationActions =
  | AddNomination
  | RemoveNomination
  | SetNomination
  | ClearNominations
  | ClearNominationsSuccess
  | ClearNominationError;
