import { MAX_NOMINATIONS } from '@shopify/utils';
export interface MovieMetadata {
  Title: string;
  Year: string | number;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieRanking extends MovieMetadata {
  votes: number;
}

export interface IOmdbSearchResults {
  Search?: Array<MovieMetadata>;
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export class OmdbSearchResults {
  Search: Array<{
    Title: string;
    Year: number;
    imdbID: string;
    Type: string;
    Poster: string;
  }>;
  totalResults: number;
  Response: 'True' | 'False';
  Error: string;

  constructor({
    Response,
    Search = [],
    totalResults = '0',
    Error = '',
  }: IOmdbSearchResults) {
    this.Response = Response;
    this.Search = OmdbSearchResults.checkForUniqueness(Search)
      .slice(0, MAX_NOMINATIONS)
      .map((movie: MovieMetadata) => ({
        ...movie,
        Year: parseInt(movie.Year as string),
      }));
    this.totalResults = parseInt(totalResults);
    this.Error = Error;
  }

  /**
   * For some reason, the API sometimes returns twice the same movie on a certain query
   * (example: try searching for "crash landing"). To eliminate duplicates based on the
   * imdbID in the movie object, we check the array for unique movies first in order to
   * make sure no duplicates are returned in our application logic.
   *
   * Example: omdbApiResponse = [movieA, movieA, movieB]
   *          this.checkForUniqueness(omdbApiResponse) => [movieA, movieB]
   *
   * @param results The search results array returned from the OMDB API
   * @returns The array, containing no duplicates if any.
   */
  private static checkForUniqueness(
    results: Array<MovieMetadata>
  ): Array<MovieMetadata> {
    const checkedMovies = {};
    return results
      .map((result) => {
        if (!checkedMovies[result.imdbID]) {
          checkedMovies[result.imdbID] = true;
          return result;
        }

        return;
      })
      .filter((result) => !!result);
  }
}

export const OMDB_ENDPOINT = 'http://www.omdbapi.com';
