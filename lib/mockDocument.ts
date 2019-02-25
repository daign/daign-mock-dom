import { MockNode } from './mockNode';

/**
 * Class to construct an object that behaves like the document node for mocking.
 */
export class MockDocument extends MockNode {
  /**
   * Constructor
   */
  public constructor() {
    super();
  }

  /**
   * Simulation of standard method createElement.
   * @param nodeName The name of the node.
   * @returns A MockNode object.
   */
  public createElement( nodeName?: string ): MockNode {
    const node = new MockNode();
    node.nodeName = nodeName;
    node.namespaceURI = 'http://www.w3.org/1999/xhtml';
    return node;
  }

  /**
   * Simulation of standard method createElementNS.
   * @param nameSpace The name space of the node.
   * @param nodeName The name of the node.
   * @returns A MockNode object.
   */
  public createElementNS( nameSpace?: string, nodeName?: string ): MockNode {
    const node = new MockNode();
    node.nodeName = nodeName;
    node.namespaceURI = nameSpace;
    return node;
  }
}
