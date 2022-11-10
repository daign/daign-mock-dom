import { expect } from 'chai';
import { spy } from 'sinon';

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
      expect( ( m as any ).eventListeners.hasOwnProperty( 'mousedown' ) ).to.be.true;
    } );

    it( 'should test access the properties of the options object', (): void => {
      // Arrange
      const m = new MockNode();
      const callback = (): void => {};

      const options = {
        get capture(): boolean {
          return false;
        },
        get once(): boolean {
          return false;
        },
        get passive(): boolean {
          return false;
        }
      };
      const captureAccessSpy = spy( options, 'capture', [ 'get' ] );
      const onceAccessSpy = spy( options, 'once', [ 'get' ] );
      const passiveAccessSpy = spy( options, 'passive', [ 'get' ] );

      // Act
      m.addEventListener( 'mousedown', callback, options );

      // Assert
      expect( captureAccessSpy.get.calledOnce ).to.be.true;
      expect( onceAccessSpy.get.calledOnce ).to.be.true;
      expect( passiveAccessSpy.get.calledOnce ).to.be.true;
    } );
  } );

  describe( 'removeEventListener', (): void => {
    it( 'should remove event listener', (): void => {
      // Arrange
      const m = new MockNode();
      const callback = (): void => {};
      m.addEventListener( 'mousedown', callback, false );

      // Act
      m.removeEventListener( 'mousedown' );

      // Assert
      expect( ( m as any ).eventListeners.hasOwnProperty( 'mousedown' ) ).to.be.false;
    } );
  } );

  describe( 'sendEvent', (): void => {
    it( 'should call event listener with event object', (): void => {
      // Arrange
      const m = new MockNode();
      const callback = spy();
      m.addEventListener( 'mousedown', callback, false );
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

    it( 'should return undefined if boundingClientRect was not set', (): void => {
      // Arrange
      const m = new MockNode();

      // Act
      const result = m.getBoundingClientRect();

      // Assert
      expect( result ).to.be.undefined;
    } );
  } );

  describe( 'setAttribute', (): void => {
    it( 'should set the attribute', (): void => {
      // Arrange
      const m = new MockNode();

      // Act
      m.setAttribute( 'someName', 'someValue' );

      // Assert
      expect( ( m as any ).attributes.someName ).to.equal( 'someValue' );
    } );
  } );

  describe( 'getAttribute', (): void => {
    it( 'should get the attribute value', (): void => {
      // Arrange
      const m = new MockNode();
      m.setAttribute( 'someName', 'someValue' );

      // Act
      const result = m.getAttribute( 'someName' );

      // Assert
      expect( result ).to.equal( 'someValue' );
    } );
  } );

  describe( 'hasAttribute', (): void => {
    it( 'should return true if the attribute exists', (): void => {
      // Arrange
      const m = new MockNode();
      m.setAttribute( 'someName', 'someValue' );

      // Act
      const result = m.hasAttribute( 'someName' );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if the attribute does not exist', (): void => {
      // Arrange
      const m = new MockNode();

      // Act
      const result = m.hasAttribute( 'someName' );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'removeAttribute', (): void => {
    it( 'should remove the attribute', (): void => {
      // Arrange
      const m = new MockNode();
      m.setAttribute( 'someName', 'someValue' );

      // Act
      m.removeAttribute( 'someName' );

      // Assert
      expect( m.hasAttribute( 'someName' ) ).to.be.false;
    } );
  } );

  describe( 'setAttributeNS', (): void => {
    it( 'should set the namespace aware attribute', (): void => {
      // Arrange
      const m = new MockNode();

      // Act
      m.setAttributeNS( 'namespace', 'someName', 'someValue' );

      // Assert
      expect( ( m as any ).namespaceAttributes.someName ).to.equal( 'someValue' );
    } );
  } );

  describe( 'getAttributeNS', (): void => {
    it( 'should get the namespace aware attribute value', (): void => {
      // Arrange
      const m = new MockNode();
      m.setAttributeNS( 'namespace', 'someName', 'someValue' );

      // Act
      const result = m.getAttributeNS( 'namespace', 'someName' );

      // Assert
      expect( result ).to.equal( 'someValue' );
    } );
  } );

  describe( 'hasAttributeNS', (): void => {
    it( 'should return true if the namespace aware attribute exists', (): void => {
      // Arrange
      const m = new MockNode();
      m.setAttributeNS( 'namespace', 'someName', 'someValue' );

      // Act
      const result = m.hasAttributeNS( 'namespace', 'someName' );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if the namespace aware attribute does not exist', (): void => {
      // Arrange
      const m = new MockNode();

      // Act
      const result = m.hasAttributeNS( 'namespace', 'someName' );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'removeAttributeNS', (): void => {
    it( 'should remove the namespace aware attribute', (): void => {
      // Arrange
      const m = new MockNode();
      m.setAttributeNS( 'namespace', 'someName', 'someValue' );

      // Act
      m.removeAttributeNS( 'namespace', 'someName' );

      // Assert
      expect( m.hasAttributeNS( 'namespace', 'someName' ) ).to.be.false;
    } );
  } );
} );
