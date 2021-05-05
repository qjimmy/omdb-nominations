import { MovieMetadata } from '@shopify/types/api/omdb';
import { NominationState } from '@shopify/types/state/nomination.state';

export const NOMINATE = '[Nominations] Nomination Selected';
export const REMOVE_NOMINATION = '[Nominations] Removed Nomination';
export const SET_NOMINATION = '[Nominations] Set Nomination';

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
  constructor(readonly nomination: NominationState) {}
}

export type NominationActions =
  | AddNomination
  | RemoveNomination
  | SetNomination;
