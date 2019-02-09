import {MockNode} from './mockNode';

/**
 * Class to construct an object that behaves like the document node for mocking.
 */
export class MockDocument extends MockNode {
  /**
   * Constructor
   */
  constructor() {
    super();
  }

  /**
   * Simulation of standard method createElement.
   * @returns A MockNode object
   */
  public createElement(): MockNode {
    return new MockNode();
  }

  /**
   * Simulation of standard method createElementNS.
   * @returns A MockNode object
   */
  public createElementNS(): MockNode {
    return new MockNode();
  }
}
