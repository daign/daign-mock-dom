# daign-mock-dom

[![CI][ci-icon]][ci-url]
[![Coverage][coveralls-icon]][coveralls-url]
[![NPM package][npm-icon]][npm-url]

#### Mocking DOM nodes and events for unit tests in Typescript.

## Installation

```sh
npm install @daign/mock-dom --save
```

## Usage

```typescript
import {expect} from 'chai';
import * as sinon from 'sinon';

import {MockEvent} from '@daign/mock-dom';
import {MockNode} from '@daign/mock-dom';

// The class under test.
class TestClass {
  constructor( node: any ) {
    node.addEventListener( 'mousedown', ( event: any ): void => {
      this.onMouseDown( event );
    }, false );
  }

  public onMouseDown( event: any ): void {
    console.log( event.clientX, event.clientY );
  }
}

describe( 'TestClass', () => {
  it( 'should add event listener that calls onMouseDown with the event object', () => {
    // Create a mock node object.
    const node = new MockNode();

    const test = new TestClass( node );

    // Spy whether the onMouseDown function gets called.
    const spy = sinon.spy( test, 'onMouseDown' );

    // Create a mock event object.
    const event = new MockEvent().setClientPoint( 1, 2 );

    // Send the mock event to the mock node.
    node.sendEvent( 'mousedown', event );

    expect( spy.calledOnce ).to.be.true;
    expect( spy.calledWith( event ) ).to.be.true;
  } );
} );
```

## Scripts

```bash
# Build
npm run build

# Run lint analysis
npm run lint

# Run unit tests with code coverage
npm run test

# Get a full lcov report
npm run coverage
```

[ci-icon]: https://github.com/daign/daign-mock-dom/workflows/CI/badge.svg
[ci-url]: https://github.com/daign/daign-mock-dom/actions
[coveralls-icon]: https://coveralls.io/repos/github/daign/daign-mock-dom/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/daign/daign-mock-dom?branch=master
[npm-icon]: https://img.shields.io/npm/v/@daign/mock-dom.svg
[npm-url]: https://www.npmjs.com/package/@daign/mock-dom
