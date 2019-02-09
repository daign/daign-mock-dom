import {expect} from 'chai';

import {MockDocument} from '../lib/mockDocument';
import {MockNode} from '../lib/mockNode';

describe( 'MockDocument', () => {
  describe( 'createElement', () => {
    it( 'should return a MockNode', () => {
      // arrange
      const m = new MockDocument();

      // act
      const result = m.createElement();

      // assert
      expect( result instanceof MockNode ).to.be.true;
    } );
  } );

  describe( 'createElementNS', () => {
    it( 'should return a MockNode', () => {
      // arrange
      const m = new MockDocument();

      // act
      const result = m.createElementNS();

      // assert
      expect( result instanceof MockNode ).to.be.true;
    } );
  } );
} );
