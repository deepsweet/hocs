# :bell: with-callback-on-change-while

[![npm](https://img.shields.io/npm/v/@hocs/with-callback-on-change-while.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-callback-on-change-while) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-callback-on-change-while&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-callback-on-change-while)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Invokes a callback on prop change while condition is true, useful to decouple side effects like `onChange` handler in a declarative way and control loops.

## Install

```
yarn add @hocs/with-callback-on-change-while
```

## Usage

```js
withCallbackOnChangeWhile(
  propName: string,
  shouldCall: (props: Object) => boolean,
  callback: (props: Object) => void
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import withCallbackOnChangeWhile from '@hocs/with-callback-on-change-while';

const Demo = ({ count, onButtonClick }) => (
  <div>
    <h1>{count}</h1>
    <button onClick={onButtonClick}>increment</button>
  </div>
);

export default compose(
  withState('count', 'setCount', 0),
  withHandlers({
    onButtonClick: ({ setCount, count }) => () => setCount(count + 1)
  }),
  withCallbackOnChangeWhile(
    'count',
    ({ count }) => count <= 5,
    ({ count }) => console.log(count)
  )
)(Demo);
```

:tv: [Check out live demo](https://codesandbox.io/s/23kkwykkln).
