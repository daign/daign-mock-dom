import { expect } from 'chai';

import { MockEvent } from '../lib/mockEvent';

describe( 'MockEvent', (): void => {
  describe( 'setClientPoint', (): void => {
    it( 'should set clientX and clientY', (): void => {
      // Arrange
      const m = new MockEvent();

      // Act
      m.setClientPoint( 1, 2 );

      // Assert
      expect( m.clientX ).to.equal( 1 );
      expect( m.clientY ).to.equal( 2 );
    } );
  } );

  describe( 'setOffsetPoint', (): void => {
    it( 'should set offsetX and offsetY', (): void => {
      // Arrange
      const m = new MockEvent();

      // Act
      m.setOffsetPoint( 1, 2 );

      // Assert
      expect( m.offsetX ).to.equal( 1 );
      expect( m.offsetY ).to.equal( 2 );
    } );
  } );

  describe( 'setPagePoint', (): void => {
    it( 'should set pageX and pageY', (): void => {
      // Arrange
      const m = new MockEvent();

      // Act
      m.setPagePoint( 1, 2 );

      // Assert
      expect( m.pageX ).to.equal( 1 );
      expect( m.pageY ).to.equal( 2 );
    } );
  } );

  describe( 'addTouchPoint', (): void => {
    it( 'should add touch events', (): void => {
      // Arrange
      const touchEvent1 = new MockEvent().setClientPoint( 1, 2 );
      const touchEvent2 = new MockEvent().setClientPoint( 3, 4 );
      const m = new MockEvent();

      // Act
      m.addTouchPoint( touchEvent1 );
      m.addTouchPoint( touchEvent2 );

      // Assert
      expect( m.touches!.length ).to.equal( 2 );
      expect( m.touches![ 0 ].clientX ).to.equal( 1 );
      expect( m.touches![ 0 ].clientY ).to.equal( 2 );
      expect( m.touches![ 1 ].clientX ).to.equal( 3 );
      expect( m.touches![ 1 ].clientY ).to.equal( 4 );
    } );
  } );

  describe( 'addTargetTouchPoint', (): void => {
    it( 'should add target touch events', (): void => {
      // Arrange
      const touchEvent1 = new MockEvent().setClientPoint( 1, 2 );
      const touchEvent2 = new MockEvent().setClientPoint( 3, 4 );
      const m = new MockEvent();

      // Act
      m.addTargetTouchPoint( touchEvent1 );
      m.addTargetTouchPoint( touchEvent2 );

      // Assert
      expect( m.targetTouches!.length ).to.equal( 2 );
      expect( m.targetTouches![ 0 ].clientX ).to.equal( 1 );
      expect( m.targetTouches![ 0 ].clientY ).to.equal( 2 );
      expect( m.targetTouches![ 1 ].clientX ).to.equal( 3 );
      expect( m.targetTouches![ 1 ].clientY ).to.equal( 4 );
    } );
  } );

  describe( 'addChangedTouchPoint', (): void => {
    it( 'should add changed touch events', (): void => {
      // Arrange
      const touchEvent1 = new MockEvent().setClientPoint( 1, 2 );
      const touchEvent2 = new MockEvent().setClientPoint( 3, 4 );
      const m = new MockEvent();

      // Act
      m.addChangedTouchPoint( touchEvent1 );
      m.addChangedTouchPoint( touchEvent2 );

      // Assert
      expect( m.changedTouches!.length ).to.equal( 2 );
      expect( m.changedTouches![ 0 ].clientX ).to.equal( 1 );
      expect( m.changedTouches![ 0 ].clientY ).to.equal( 2 );
      expect( m.changedTouches![ 1 ].clientX ).to.equal( 3 );
      expect( m.changedTouches![ 1 ].clientY ).to.equal( 4 );
    } );
  } );

  describe( 'setScrollDelta', (): void => {
    it( 'should set deltaX and deltaY', (): void => {
      // Arrange
      const m = new MockEvent();

      // Act
      m.setScrollDelta( 1, 2 );

      // Assert
      expect( m.deltaX ).to.equal( 1 );
      expect( m.deltaY ).to.equal( 2 );
      expect( m.deltaMode ).to.equal( 0 );
    } );

    it( 'should set deltaMode', (): void => {
      // Arrange
      const m = new MockEvent();

      // Act
      m.setScrollDelta( 1, 2, 3 );

      // Assert
      expect( m.deltaMode ).to.equal( 3 );
    } );
  } );

  describe( 'preventDefault', (): void => {
    it( 'should not throw an error when called', (): void => {
      // Arrange
      const m = new MockEvent();

      // Act and assert
      expect( m.preventDefault ).to.not.throw();
    } );
  } );

  describe( 'stopPropagation', (): void => {
    it( 'should not throw an error when called', (): void => {
      // Arrange
      const m = new MockEvent();

      // Act and assert
      expect( m.stopPropagation ).to.not.throw();
    } );
  } );
} );
