import { MovieMetadata } from '../api';

export interface NominationState {
  nominees: {
    [key: string]: MovieMetadata;
  };
  loading: boolean;
  error: any;
}
