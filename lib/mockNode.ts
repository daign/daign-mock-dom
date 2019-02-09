import {MockEvent} from './mockEvent';

/**
 * Interface for BoundingClientRect objects.
 */
interface IBoundingClientRect {
  left: number;
  top: number;
}

/**
 * Class to construct an object that behaves like a DOM node for mocking.
 */
export class MockNode {
  // In contrast to browser implementation this mock only holds one callback for every event name.
  private eventListeners: { [ eventName: string ]: ( event: any ) => void; } = {};

  private boundingClientRect: IBoundingClientRect = { left: 0, top: 0 };

  /**
   * Constructor.
   */
  constructor() {}

  /**
   * Simulation of standard node method addEventListener.
   * Overwrites previous listeners to the same event name.
   * @param eventName The name of the event
   * @param callback The listener callback function
   */
  public addEventListener( eventName: string, callback: ( event: any ) => void ): void {
    this.eventListeners[ eventName ] = callback;
  }

  /**
   * Simulation of standard node method removeEventListener.
   * @param eventName The name of the event
   */
  public removeEventListener( eventName: string ): void {
    delete this.eventListeners[ eventName ];
  }

  /**
   * Simulates an event being send to the registered listener.
   * Will throw error if no listener is registered to the event name.
   * @param eventName The name of the event
   * @param event The event data to send
   * @returns A reference to itself
   */
  public sendEvent( eventName: string, event: MockEvent ): MockNode {
    this.eventListeners[ eventName ]( event );
    return this;
  }

  /**
   * Set the bounding client rect
   * @param rect The bounding client rect object
   * @returns A reference to itself
   */
  public setBoundingClientRect( rect: IBoundingClientRect ): MockNode {
    this.boundingClientRect = rect;
    return this;
  }

  /**
   * Simulation of standard node method getBoundingClientRect.
   * @returns The bounding client rect object
   */
  public getBoundingClientRect(): IBoundingClientRect {
    return this.boundingClientRect;
  }
}
