import { EventAdapter } from "../../../shared/contracts/events/adapters/eventAdapter";

export class SqsAdapter implements EventAdapter {

  listen<T>(channel: string, worker: (response: any) => void) {
    throw new Error("Method not implemented.");
  }
  
  connect(): boolean {
    throw new Error("Method not implemented.");
  }

  subscribe<T>(channel: string, worker: (response: T) => void): boolean {
    throw new Error("Method not implemented.");
  }
  
  send<T>(channel: string, payload: T): boolean {
    throw new Error("Method not implemented.");
  }
}