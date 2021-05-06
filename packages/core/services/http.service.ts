import type { DocumentNode } from 'graphql';
import { Http } from '@shopify/types';

interface WithQueryMetadata extends RequestInit {
  query?: {
    [key: string]: string;
  };
}

type RequestMetadata = {
  method: Http.Methods;
  path: RequestInfo;
  meta?: WithQueryMetadata;
};

export class HttpService {
  private static readonly defaultHeaders = {};

  /**
   * Inner method to reuse the logic of a basic fetch. The JSON response
   * failure is determined whether the HTTP code is in the range of 400.
   * This can be determined with the "ok" boolean and should be thrown
   * as an error to be handled in a try-catch clause instead of an if
   * statement.
   *
   * @param requestMetadata An Object containing the HTTP method,
   * the request resource path and the metadata which includes headers, body, etc.
   *
   * @returns A promise holding the response.
   */
  private static async httpRequest<T = any>({
    method,
    path,
    meta = {},
  }: RequestMetadata): Promise<T> {
    return fetch(path, {
      ...meta,
      method,
      headers: {
        ...this.defaultHeaders,
        ...meta?.headers,
      },
    }).then(async (res: Response) => {
      if (res.status >= 500) throw res.statusText;

      const response = (await res.json()) as T;
      if (!res.ok) {
        throw response;
      }
      return response;
    });
  }

  private static async httpHeader({
    method,
    path,
    meta = {},
  }: RequestMetadata): Promise<Headers> {
    return fetch(path, {
      ...meta,
      method,
      headers: {
        ...this.defaultHeaders,
        ...meta?.headers,
      },
    }).then((res: Response) => res.headers);
  }

  static buildUrlQuery(query?: { [key: string]: string | number }): string {
    return query
      ? Object.keys(query)
          .reduce((accumulator, current) => {
            if (!query[current]) return accumulator;
            return `${accumulator}${current}=${query[current]}&`;
          }, '?')
          .slice(0, -1)
      : '';
  }

  static get<T = any>(
    path: RequestInfo,
    meta: WithQueryMetadata = {}
  ): Promise<T> {
    const endpoint = `${path}${this.buildUrlQuery(meta?.query)}`;

    return this.httpRequest<T>({
      method: Http.Methods.GET,
      path: endpoint,
      meta,
    });
  }

  static post<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return this.httpRequest<T>({ method: Http.Methods.POST, path, meta });
  }

  static put<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return this.httpRequest<T>({ method: Http.Methods.PUT, path, meta });
  }

  static delete<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return this.httpRequest<T>({ method: Http.Methods.DELETE, path, meta });
  }

  static patch<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return this.httpRequest<T>({ method: Http.Methods.PATCH, path, meta });
  }

  static head(path: RequestInfo, meta?: RequestInit): Promise<Headers> {
    return this.httpHeader({ method: Http.Methods.HEAD, path, meta });
  }

  static option(path: RequestInfo, meta?: RequestInit): Promise<Headers> {
    return this.httpHeader({ method: Http.Methods.OPTIONS, path, meta });
  }

  static connect(path: RequestInfo, meta?: RequestInit): Promise<Headers> {
    return this.httpHeader({ method: Http.Methods.CONNECT, path, meta });
  }

  static trace<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return this.httpRequest<T>({ method: Http.Methods.TRACE, path, meta });
  }

  /**
   * Wrapper for GraphQL queries and mutations over HTTP POST.
   * Example usage: HttpService.gql(UserQuery, { userId })
   *
   * Generic <T> types the returned value.
   *
   * On status codes 400+, the value returned should be an object containing the errors.
   *
   * Reference: https://graphql.org/learn/serving-over-http/#post-request
   *
   * @param query GraphQL query or mutation.
   * @param variables Variables sent to populate queries or mutations.
   * @param operationName Only required if multiple operations are present in the query.
   */
  static async gql<T = any>(
    query: DocumentNode,
    variables: any = {},
    authToken?: string,
    operationName?: any
  ): Promise<T> {
    const Authorization = `Bearer ${authToken}` ?? 'Unauthenticated';

    return this.post<{ data: T; errors?: any }>('/api/graphql', {
      body: JSON.stringify({
        query: query.loc && query.loc.source.body,
        variables,
        operationName,
      }),
      headers: {
        Authorization,
      },
    }).then(({ data }) => {
      return data;
    });
  }
}
