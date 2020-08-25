import { expect } from 'chai';

import { MockDocument } from '../lib/mockDocument';
import { MockNode } from '../lib/mockNode';

describe( 'MockDocument', (): void => {
  describe( 'createElement', (): void => {
    it( 'should return a MockNode', (): void => {
      // Arrange
      const m = new MockDocument();

      // Act
      const result = m.createElement();

      // Assert
      expect( result instanceof MockNode ).to.be.true;
    } );

    it( 'should set the node name when passed', (): void => {
      // Arrange
      const nodeName = 'SomeNodeName';
      const m = new MockDocument();

      // Act
      const result = m.createElement( nodeName );

      // Assert
      expect( result.nodeName ).to.equal( nodeName );
    } );

    it( 'should set the correct name space', (): void => {
      // Arrange
      const m = new MockDocument();

      // Act
      const result = m.createElement();

      // Assert
      expect( result.namespaceURI ).to.equal( 'http://www.w3.org/1999/xhtml' );
    } );
  } );

  describe( 'createElementNS', (): void => {
    it( 'should return a MockNode', (): void => {
      // Arrange
      const m = new MockDocument();

      // Act
      const result = m.createElementNS();

      // Assert
      expect( result instanceof MockNode ).to.be.true;
    } );

    it( 'should set the name space when passed', (): void => {
      // Arrange
      const nameSpace = 'SomeNameSpace';
      const m = new MockDocument();

      // Act
      const result = m.createElementNS( nameSpace );

      // Assert
      expect( result.namespaceURI ).to.equal( nameSpace );
    } );

    it( 'should set the node name when passed', (): void => {
      // Arrange
      const nameSpace = 'SomeNameSpace';
      const nodeName = 'SomeNodeName';
      const m = new MockDocument();

      // Act
      const result = m.createElementNS( nameSpace, nodeName );

      // Assert
      expect( result.nodeName ).to.equal( nodeName );
    } );
  } );
} );
