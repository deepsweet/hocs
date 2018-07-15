# :bell: with-callback-on-change

[![npm](https://img.shields.io/npm/v/@hocs/with-callback-on-change.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-callback-on-change) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-callback-on-change&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-callback-on-change)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Invokes a callback on prop change, useful to decouple side effects like `onChange` handler in a declarative way.

## Install

```
yarn add @hocs/with-callback-on-change
```

## Usage

```js
withCallbackOnChange(
  propName: string,
  callback: (props: Object) => void
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import withCallbackOnChange from '@hocs/with-callback-on-change';

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
  withCallbackOnChange('count', ({ count }) => console.log(count))
)(Demo);
```

:tv: [Check out live demo](https://codesandbox.io/s/o8m03w7j6).
