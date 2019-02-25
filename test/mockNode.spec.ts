import { expect } from 'chai';
import * as sinon from 'sinon';

import { MockEvent } from '../lib/mockEvent';
import { MockNode } from '../lib/mockNode';

describe( 'MockNode', () => {
  describe( 'addEventListener', () => {
    it( 'should add event listener', () => {
      // Arrange
      const m = new MockNode();
      const callback = (): void => {};

      // Act
      m.addEventListener( 'mousedown', callback );

      // Assert
      expect( 'mousedown' in ( m as any ).eventListeners ).to.be.true;
    } );
  } );

  describe( 'removeEventListener', () => {
    it( 'should remove event listener', () => {
      // Arrange
      const m = new MockNode();
      const callback = (): void => {};
      m.addEventListener( 'mousedown', callback );

      // Act
      m.removeEventListener( 'mousedown' );

      // Assert
      expect( 'mousedown' in ( m as any ).eventListeners ).to.be.false;
    } );
  } );

  describe( 'sendEvent', () => {
    it( 'should call event listener with event object', () => {
      // Arrange
      const m = new MockNode();
      const callback = sinon.spy();
      m.addEventListener( 'mousedown', callback );
      const event = new MockEvent().setClientPoint( 1, 2 );

      // Act
      m.sendEvent( 'mousedown', event );

      // Assert
      expect( callback.calledOnce ).to.be.true;
      expect( callback.calledWith( event ) ).to.be.true;
    } );

    it( 'should throw error if there is no listener for the sent event', () => {
      // Arrange
      const m = new MockNode();
      const event = new MockEvent().setClientPoint( 1, 2 );

      // Act
      const badFn = (): void => {
        m.sendEvent( 'mousedown', event );
      };

      // Assert
      expect( badFn ).to.throw();
    } );
  } );

  describe( 'setBoundingClientRect', () => {
    it( 'should set boundingClientRect', () => {
      // Arrange
      const m = new MockNode();
      const rect = { left: 1, top: 2 };

      // Act
      m.setBoundingClientRect( rect );

      // Assert
      expect( ( m as any ).boundingClientRect ).to.equal( rect );
    } );
  } );

  describe( 'getBoundingClientRect', () => {
    it( 'should get boundingClientRect', () => {
      // Arrange
      const m = new MockNode();
      const rect = { left: 1, top: 2 };
      m.setBoundingClientRect( rect );

      // Act
      const result = m.getBoundingClientRect();

      // Assert
      expect( result ).to.equal( rect );
    } );
  } );

  describe( 'setAttribute', () => {
    it( 'should not throw an error when called', () => {
      // Arrange
      const m = new MockNode();

      // Act and assert
      expect( m.setAttribute ).to.not.throw();
    } );
  } );
} );
