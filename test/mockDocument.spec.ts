import { expect } from 'chai';

import { MockDocument } from '../lib/mockDocument';
import { MockNode } from '../lib/mockNode';

describe( 'MockDocument', () => {
  describe( 'createElement', () => {
    it( 'should return a MockNode', () => {
      // Arrange
      const m = new MockDocument();

      // Act
      const result = m.createElement();

      // Assert
      expect( result instanceof MockNode ).to.be.true;
    } );

    it( 'should set the node name when passed', () => {
      // Arrange
      const nodeName = 'SomeNodeName';
      const m = new MockDocument();

      // Act
      const result = m.createElement( nodeName );

      // Assert
      expect( result.nodeName ).to.equal( nodeName );
    } );

    it( 'should set the correct name space', () => {
      // Arrange
      const m = new MockDocument();

      // Act
      const result = m.createElement();

      // Assert
      expect( result.namespaceURI ).to.equal( 'http://www.w3.org/1999/xhtml' );
    } );
  } );

  describe( 'createElementNS', () => {
    it( 'should return a MockNode', () => {
      // Arrange
      const m = new MockDocument();

      // Act
      const result = m.createElementNS();

      // Assert
      expect( result instanceof MockNode ).to.be.true;
    } );

    it( 'should set the name space when passed', () => {
      // Arrange
      const nameSpace = 'SomeNameSpace';
      const m = new MockDocument();

      // Act
      const result = m.createElementNS( nameSpace );

      // Assert
      expect( result.namespaceURI ).to.equal( nameSpace );
    } );

    it( 'should set the node name when passed', () => {
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
