import { EventAdapter } from "../../../shared/contracts/events/adapters/eventAdapter";

export class RabbitAdapter implements EventAdapter {
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