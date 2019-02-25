import { MockNode } from './mockNode';

/**
 * Class to construct an event-like object for mocking
 */
export class MockEvent {
  public clientX: number | undefined = undefined;
  public clientY: number | undefined = undefined;
  public offsetX: number | undefined = undefined;
  public offsetY: number | undefined = undefined;
  public pageX: number | undefined = undefined;
  public pageY: number | undefined = undefined;

  public touches: MockEvent[] | undefined = undefined;
  public targetTouches: MockEvent[] | undefined = undefined;

  public target: MockNode | undefined = undefined;

  /**
   * Constructor
   */
  public constructor() {}

  /**
   * Set the coordinates for clientX and clientY
   * @param x The x coordinate
   * @param y The y coordinate
   * @returns A reference to itself
   */
  public setClientPoint( x: number, y: number ): MockEvent {
    this.clientX = x;
    this.clientY = y;
    return this;
  }

  /**
   * Set the coordinates for offsetX and offsetY
   * @param x The x coordinate
   * @param y The y coordinate
   * @returns A reference to itself
   */
  public setOffsetPoint( x: number, y: number ): MockEvent {
    this.offsetX = x;
    this.offsetY = y;
    return this;
  }

  /**
   * Set the coordinates for pageX and pageY
   * @param x The x coordinate
   * @param y The y coordinate
   * @returns A reference to itself
   */
  public setPagePoint( x: number, y: number ): MockEvent {
    this.pageX = x;
    this.pageY = y;
    return this;
  }

  /**
   * Add a touch event
   * @param touchEvent A MockEvent for the touch event
   * @returns A reference to itself
   */
  public addTouchPoint( touchEvent: MockEvent ): MockEvent {
    if ( !this.touches ) {
      this.touches = [];
    }
    this.touches.push( touchEvent );
    return this;
  }

  /**
   * Add a target touch event
   * @param touchEvent A MockEvent for the touch event
   * @returns A reference to itself
   */
  public addTargetTouchPoint( touchEvent: MockEvent ): MockEvent {
    if ( !this.targetTouches ) {
      this.targetTouches = [];
    }
    this.targetTouches.push( touchEvent );
    return this;
  }

  /**
   * Method stub for standard Event method preventDefault
   */
  public preventDefault(): void {}

  /**
   * Method stub for standard Event method stopPropagation
   */
  public stopPropagation(): void {}
}
