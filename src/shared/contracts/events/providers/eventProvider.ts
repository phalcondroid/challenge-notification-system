export interface EventProvider {
  connection(any: any): any;
  subscribe<T>(channel: string, worker: (response: T) => void): boolean;
  listen<T>(channel: string, worker: (response: any) => void): any;
  send<T>(channel: string, payload: T): boolean;
  fire<T>(channel: string, data: any, interceptor: (response: any) => void): boolean;
}