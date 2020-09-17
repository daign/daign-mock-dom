import { expect } from 'chai';
import * as sinon from 'sinon';

import { MockEvent } from '../lib/mockEvent';
import { MockNode } from '../lib/mockNode';

describe( 'MockNode', (): void => {
  describe( 'firstChild', (): void => {
    it( 'should return the first child', (): void => {
      // Arrange
      const m = new MockNode();
      const child1 = new MockNode();
      const child2 = new MockNode();
      m.appendChild( child1 );
      m.appendChild( child2 );

      // Act
      const result = m.firstChild;

      // Assert
      expect( result ).to.equal( child1 );
    } );

    it( 'should return null when there are no children', (): void => {
      // Arrange
      const m = new MockNode();

      // Act
      const result = m.firstChild;

      // Assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'appendChild', (): void => {
    it( 'should append a child node', (): void => {
      // Arrange
      const m = new MockNode();
      const child = new MockNode();

      // Act
      const result = m.appendChild( child );

      // Assert
      expect( result ).to.equal( child );
      expect( m.children.length ).to.equal( 1 );
    } );
  } );

  describe( 'removeChild', (): void => {
    it( 'should remove a child node', (): void => {
      // Arrange
      const m = new MockNode();
      const child1 = new MockNode();
      const child2 = new MockNode();
      m.appendChild( child1 );
      m.appendChild( child2 );

      // Act
      const result = m.removeChild( child1 );

      // Assert
      expect( result ).to.equal( child1 );
      expect( m.children.length ).to.equal( 1 );
      expect( m.children[ 0 ] ).to.equal( child2 );
    } );

    it( 'should throw error when the node to be removed is not a child of this node.', (): void => {
      // Arrange
      const m = new MockNode();
      const child = new MockNode();

      // Act
      const badFn = (): void => {
        m.removeChild( child );
      };

      // Assert
      expect( badFn ).to.throw( 'The node to be removed is not a child of this node.' );
    } );
  } );

  describe( 'addEventListener', (): void => {
    it( 'should add event listener', (): void => {
      // Arrange
      const m = new MockNode();
      const callback = (): void => {};

      // Act
      m.addEventListener( 'mousedown', callback );

      // Assert
      expect( 'mousedown' in ( m as any ).eventListeners ).to.be.true;
    } );
  } );

  describe( 'removeEventListener', (): void => {
    it( 'should remove event listener', (): void => {
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

  describe( 'sendEvent', (): void => {
    it( 'should call event listener with event object', (): void => {
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

    it( 'should throw error if there is no listener for the sent event', (): void => {
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

  describe( 'setBoundingClientRect', (): void => {
    it( 'should set boundingClientRect', (): void => {
      // Arrange
      const m = new MockNode();
      const rect = { left: 1, top: 2 };

      // Act
      m.setBoundingClientRect( rect );

      // Assert
      expect( ( m as any ).boundingClientRect ).to.equal( rect );
    } );
  } );

  describe( 'getBoundingClientRect', (): void => {
    it( 'should get boundingClientRect', (): void => {
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

  describe( 'setAttribute', (): void => {
    it( 'should not throw an error when called', (): void => {
      // Arrange
      const m = new MockNode();

      // Act and assert
      expect( m.setAttribute ).to.not.throw();
    } );

    it( 'should not throw an error when called with parameters', (): void => {
      // Arrange
      const m = new MockNode();

      // Act
      const badFn = (): void => {
        m.setAttribute( 1, 2 );
      };

      // Act and assert
      expect( badFn ).to.not.throw();
    } );
  } );

  describe( 'removeAttribute', (): void => {
    it( 'should not throw an error when called', (): void => {
      // Arrange
      const m = new MockNode();

      // Act and assert
      expect( m.removeAttribute ).to.not.throw();
    } );

    it( 'should not throw an error when called with parameters', (): void => {
      // Arrange
      const m = new MockNode();

      // Act
      const badFn = (): void => {
        m.removeAttribute( 1, 2 );
      };

      // Act and assert
      expect( badFn ).to.not.throw();
    } );
  } );
} );
