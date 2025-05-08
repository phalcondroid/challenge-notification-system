import { EventAdapter } from "../../../shared/contracts/events/adapters/eventAdapter";
import { EventProvider } from "../../../shared/contracts/events/providers/eventProvider";

export class EventHandlerProvider implements EventProvider {

  // Kafka is perfect for this adapter example
  constructor(private readonly pubSubAdapter: EventAdapter) {
    this.pubSubAdapter.connect();
  }
  public listen<T>(channel: string, worker: (response: any) => void) {
    return this.pubSubAdapter.subscribe(channel, worker);
  }

  /**
   * Subscribe to event
   * @param channel 
   * @param worker 
   */
  public subscribe<T>(channel: string, worker: (response: T) => void): boolean {
    return this.pubSubAdapter.subscribe(channel, worker);
  }

  /**
   * Fire event
   * @param channel 
   * @param payload 
   */
  public send<T>(channel: string, payload: T): boolean {
    return this.send(channel, payload);
  }
}