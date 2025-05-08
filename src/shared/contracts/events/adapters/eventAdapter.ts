export interface EventAdapter {
  connect(): boolean;
  subscribe<T>(channel: string, worker: (response: T) => void): boolean;
  listen<T>(channel: string, worker: (response: any) => void): any;
  send<T>(channel: string, payload: T): boolean;
}