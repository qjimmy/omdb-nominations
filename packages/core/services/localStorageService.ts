export class LocalStorageService {
  static readonly localStorageNominationKey =
    'shopify-frontend-challenge-nominations';

  static get(key: string): string {
    const value = window.localStorage.getItem(key);
    return value;
  }

  static setNominations(value: any): void {
    window.localStorage.setItem(
      this.localStorageNominationKey,
      JSON.stringify(value)
    );
  }

  static getNominations<T = any>(): T {
    const value = JSON.parse(
      window.localStorage.getItem(this.localStorageNominationKey) || '{}'
    ) as T;

    return value;
  }
}
