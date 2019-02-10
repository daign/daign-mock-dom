import {expect} from 'chai';
import * as sinon from 'sinon';

import {MockEvent} from '../lib/mockEvent';
import {MockNode} from '../lib/mockNode';

describe( 'MockNode', () => {
  describe( 'addEventListener', () => {
    it( 'should add event listener', () => {
      // arrange
      const m = new MockNode();
      const callback = () => {};

      // act
      m.addEventListener( 'mousedown', callback );

      // assert
      expect( 'mousedown' in ( m as any ).eventListeners ).to.be.true;
    } );
  } );

  describe( 'removeEventListener', () => {
    it( 'should remove event listener', () => {
      // arrange
      const m = new MockNode();
      const callback = () => {};
      m.addEventListener( 'mousedown', callback );

      // act
      m.removeEventListener( 'mousedown' );

      // assert
      expect( 'mousedown' in ( m as any ).eventListeners ).to.be.false;
    } );
  } );

  describe( 'sendEvent', () => {
    it( 'should call event listener with event object', () => {
      // arrange
      const m = new MockNode();
      const callback = sinon.spy();
      m.addEventListener( 'mousedown', callback );
      const event = new MockEvent().setClientPoint( 1, 2 );

      // act
      m.sendEvent( 'mousedown', event );

      // assert
      expect( callback.calledOnce ).to.be.true;
      expect( callback.calledWith( event ) ).to.be.true;
    } );

    it( 'should throw error if there is no listener for the sent event', () => {
      // arrange
      const m = new MockNode();
      const event = new MockEvent().setClientPoint( 1, 2 );

      // act
      const badFn = () => {
        m.sendEvent( 'mousedown', event );
      };

      // assert
      expect( badFn ).to.throw();
    } );
  } );

  describe( 'setBoundingClientRect', () => {
    it( 'should set boundingClientRect', () => {
      // arrange
      const m = new MockNode();
      const rect = { left: 1, top: 2 };

      // act
      m.setBoundingClientRect( rect );

      // assert
      expect( ( m as any ).boundingClientRect ).to.equal( rect );
    } );
  } );

  describe( 'getBoundingClientRect', () => {
    it( 'should get boundingClientRect', () => {
      // arrange
      const m = new MockNode();
      const rect = { left: 1, top: 2 };
      m.setBoundingClientRect( rect );

      // act
      const result = m.getBoundingClientRect();

      // assert
      expect( result ).to.equal( rect );
    } );
  } );
} );
