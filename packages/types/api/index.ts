export namespace Http {
  export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    CONNECT = 'CONNECT',
    TRACE = 'TRACE',
  }
}

export * from './omdb';
export * from './http';
