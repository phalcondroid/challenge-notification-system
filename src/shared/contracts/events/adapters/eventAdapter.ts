export interface EventAdapter {
  connect(): boolean;
  subscribe<T>(channel: string, worker: (response: T) => void): boolean;
  send<T>(channel: string, payload: T): boolean;
}