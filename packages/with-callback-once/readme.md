# :bell: with-callback-once

[![npm](https://img.shields.io/npm/v/@hocs/with-callback-once.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-callback-once) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-callback-once&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-callback-once)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Invokes a callback once condition is true (while previous check was false), useful to decouple side effects like `onSuccess` or `onError` handlers in a declarative way.

## Install

```
yarn add @hocs/with-callback-once
```

## Usage

```js
withCallbackOnce(
  shouldCall: (props: Object) => boolean,
  callback: (props: Object) => void
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import withCallbackOnChangeWhile from '@hocs/with-callback-on-change-while';
import withCallbackOnce from '@hocs/with-callback-once';

const Demo = ({ count, onButtonClick }) => (
  <div>
    <h1>{count}</h1>
    <button onClick={onButtonClick}>decrement</button>
  </div>
);

export default compose(
  withState('count', 'setCount', 5),
  withHandlers({
    onButtonClick: ({ setCount, count }) => () => setCount(count - 1)
  }),
  withCallbackOnChangeWhile(
    'count',
    ({ count }) => count >= 0,
    ({ count }) => console.log(count)
  ),
  withCallbackOnce(
    ({ count }) => count === 0,
    () => console.log('done!')
  )
)(Demo);
```

:tv: [Check out live demo](https://codesandbox.io/s/mz1nm8l93y).
