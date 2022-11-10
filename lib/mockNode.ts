import { MockEvent } from './mockEvent';

/**
 * Interface for BoundingClientRect objects.
 */
interface IBoundingClientRect {
  left: number | undefined
  top: number | undefined
}

/**
 * Class to construct an object that behaves like a DOM node for mocking.
 */
export class MockNode {
  public nodeName: string | undefined;
  public namespaceURI: string | undefined;

  public children: MockNode[] = [];

  public style: any = {};
  public textContent: string | undefined;

  private attributes: { [ attributeName: string ]: string } = {};
  private namespaceAttributes: { [ attributeName: string ]: string } = {};

  // In contrast to browser implementation this mock only holds one callback for every event name.
  private eventListeners: { [ eventName: string ]: ( event: any ) => void } = {};

  private boundingClientRect: IBoundingClientRect | undefined;

  /**
   * Get the first child.
   * @returns The first child or null.
   */
  public get firstChild(): MockNode | null {
    if ( this.children.length > 0 ) {
      return this.children[ 0 ];
    } else {
      return null;
    }
  }

  /**
   * Constructor.
   */
  public constructor() {}

  /**
   * Simulation of standard node method appendChild.
   * @param child - The child node to add.
   * @returns The added child node.
   */
  public appendChild( child: MockNode ): MockNode {
    this.children.push( child );
    return child;
  }

  /**
   * Simulation of standard node method removeChild.
   * Will throw an error when the node to be removed is not a child of this node.
   * @param child - The child node to remove.
   * @returns The removed child node.
   */
  public removeChild( child: MockNode ): MockNode {
    const index = this.children.indexOf( child );
    if ( index > -1 ) {
      this.children.splice( index, 1 );
      return child;
    } else {
      throw new Error( 'The node to be removed is not a child of this node.' );
    }
  }

  /**
   * Simulation of standard node method addEventListener.
   * Overwrites previous listeners to the same event name.
   * @param eventName - The name of the event.
   * @param callback - The listener callback function.
   * @param options - The event listener options or useCapture value. Optional.
   */
  public addEventListener(
    eventName: string,
    callback: ( event: any ) => void,
    options?: AddEventListenerOptions | boolean
  ): void {
    this.eventListeners[ eventName ] = callback;

    // Test accessing the options properties.
    if ( options && typeof options === 'object' ) {
      // tslint:disable-next-line:no-unused-expression-chai
      options.capture;
      // tslint:disable-next-line:no-unused-expression-chai
      options.once;
      // tslint:disable-next-line:no-unused-expression-chai
      options.passive;
    }
  }

  /**
   * Simulation of standard node method removeEventListener.
   * @param eventName - The name of the event.
   * @param _callback - The listener callback function. Optional for testing.
   * @param _options - The event listener options or useCapture value. Optional.
   */
  public removeEventListener(
    eventName: string,
    _callback?: ( event: any ) => void,
    _options?: EventListenerOptions | boolean
  ): void {
    delete this.eventListeners[ eventName ];
  }

  /**
   * Simulates an event being send to the registered listener.
   * Will throw error if no listener is registered to the event name.
   * @param eventName - The name of the event.
   * @param event - The event data to send.
   * @returns A reference to itself.
   */
  public sendEvent( eventName: string, event: MockEvent ): MockNode {
    this.eventListeners[ eventName ]( event );
    return this;
  }

  /**
   * Set the bounding client rect.
   * @param rect - The bounding client rect object.
   * @returns A reference to itself.
   */
  public setBoundingClientRect( rect: IBoundingClientRect | undefined ): MockNode {
    this.boundingClientRect = rect;
    return this;
  }

  /**
   * Simulation of standard node method getBoundingClientRect.
   * @returns The bounding client rect object or undefined.
   */
  public getBoundingClientRect(): IBoundingClientRect | undefined {
    return this.boundingClientRect;
  }

  /**
   * Set an attribute.
   * @param name - The attribute name.
   * @param value - The attribute value.
   */
  public setAttribute( name: string, value: string ): void {
    this.attributes[ name ] = value;
  }

  /**
   * Get an attribute.
   * @param name - The attribute name.
   * @returns The attribute value.
   */
  public getAttribute( name: string ): string {
    return this.attributes[ name ];
  }

  /**
   * Check whether the node has an attribute with the specified name.
   * @param name - The attribute name.
   * @returns The result of the check.
   */
  public hasAttribute( name: string ): boolean {
    return this.attributes.hasOwnProperty( name );
  }

  /**
   * Remove an attribute.
   * @param name - The attribute name.
   */
  public removeAttribute( name: string ): void {
    delete this.attributes[ name ];
  }

  /**
   * Set a namespace aware attribute.
   * @param namespace - The namespace of the attribute.
   * @param name - The attribute name.
   * @param value - The attribute value.
   */
  public setAttributeNS( _namespace: string, name: string, value: string ): void {
    this.namespaceAttributes[ name ] = value;
  }

  /**
   * Get a namespace aware attribute.
   * @param namespace - The namespace of the attribute.
   * @param name - The attribute name.
   * @returns The attribute value.
   */
  public getAttributeNS( _namespace: string, name: string ): string {
    return this.namespaceAttributes[ name ];
  }

  /**
   * Check whether the node has a namespace aware attribute with the specified name.
   * @param namespace - The namespace of the attribute.
   * @param name - The attribute name.
   * @returns The result of the check.
   */
  public hasAttributeNS( _namespace: string, name: string ): boolean {
    return this.namespaceAttributes.hasOwnProperty( name );
  }

  /**
   * Remove a namespace aware attribute.
   * @param namespace - The namespace of the attribute.
   * @param name - The attribute name.
   */
  public removeAttributeNS( _namespace: string, name: string ): void {
    delete this.namespaceAttributes[ name ];
  }
}
