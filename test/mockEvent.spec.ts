import {expect} from 'chai';

import {MockEvent} from '../lib/mockEvent';

describe( 'MockEvent', () => {
  describe( 'setClientPoint', () => {
    it( 'should set clientX and clientY', () => {
      // arrange
      const m = new MockEvent();

      // act
      m.setClientPoint( 1, 2 );

      // assert
      expect( m.clientX ).to.equal( 1 );
      expect( m.clientY ).to.equal( 2 );
    } );
  } );

  describe( 'setOffsetPoint', () => {
    it( 'should set offsetX and offsetY', () => {
      // arrange
      const m = new MockEvent();

      // act
      m.setOffsetPoint( 1, 2 );

      // assert
      expect( m.offsetX ).to.equal( 1 );
      expect( m.offsetY ).to.equal( 2 );
    } );
  } );

  describe( 'setPagePoint', () => {
    it( 'should set pageX and pageY', () => {
      // arrange
      const m = new MockEvent();

      // act
      m.setPagePoint( 1, 2 );

      // assert
      expect( m.pageX ).to.equal( 1 );
      expect( m.pageY ).to.equal( 2 );
    } );
  } );

  describe( 'addTouchPoint', () => {
    it( 'should add touch events', () => {
      // arrange
      const touchEvent1 = new MockEvent().setClientPoint( 1, 2 );
      const touchEvent2 = new MockEvent().setClientPoint( 3, 4 );
      const m = new MockEvent();

      // act
      m.addTouchPoint( touchEvent1 );
      m.addTouchPoint( touchEvent2 );

      // assert
      expect( m.touches!.length ).to.equal( 2 );
      expect( m.touches![ 0 ].clientX ).to.equal( 1 );
      expect( m.touches![ 0 ].clientY ).to.equal( 2 );
      expect( m.touches![ 1 ].clientX ).to.equal( 3 );
      expect( m.touches![ 1 ].clientY ).to.equal( 4 );
    } );
  } );

  describe( 'addTargetTouchPoint', () => {
    it( 'should add target touch events', () => {
      // arrange
      const touchEvent1 = new MockEvent().setClientPoint( 1, 2 );
      const touchEvent2 = new MockEvent().setClientPoint( 3, 4 );
      const m = new MockEvent();

      // act
      m.addTargetTouchPoint( touchEvent1 );
      m.addTargetTouchPoint( touchEvent2 );

      // assert
      expect( m.targetTouches!.length ).to.equal( 2 );
      expect( m.targetTouches![ 0 ].clientX ).to.equal( 1 );
      expect( m.targetTouches![ 0 ].clientY ).to.equal( 2 );
      expect( m.targetTouches![ 1 ].clientX ).to.equal( 3 );
      expect( m.targetTouches![ 1 ].clientY ).to.equal( 4 );
    } );
  } );

  describe( 'preventDefault', () => {
    it( 'should not throw an error when called', () => {
      // arrange
      const m = new MockEvent();

      // act and assert
      expect( m.preventDefault ).to.not.throw();
    } );
  } );

  describe( 'stopPropagation', () => {
    it( 'should not throw an error when called', () => {
      // arrange
      const m = new MockEvent();

      // act and assert
      expect( m.stopPropagation ).to.not.throw();
    } );
  } );
} );
