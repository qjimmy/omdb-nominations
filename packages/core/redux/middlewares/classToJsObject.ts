import { Middleware, MiddlewareAPI, AnyAction, Dispatch } from 'redux';

export const classToJsObject: Middleware<{}, any> = (
  _store: MiddlewareAPI<Dispatch<AnyAction>, any>
) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  next({ ...action });
};
