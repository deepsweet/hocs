# :hourglass: throttle-handler

[![npm](https://img.shields.io/npm/v/@hocs/throttle-handler.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/throttle-handler) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/throttle-handler&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/throttle-handler)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Helps to throttle handlers like `onChange`.

## Install

```
yarn add @hocs/throttle-handler
```

## Usage

```js
throttleHandler(
  handlerName: string,
  interval?: number,
  leadingCall?: boolean
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import throttleHandler from '@hocs/throttle-handler';

const Demo = ({ count, onButtonClick }) => (
  <div>
    <h1>{count}</h1>
    <button onClick={onButtonClick}>CLICK ME FAST</button>
  </div>
);

export default compose(
  withState('count', 'setCount', 0),
  withHandlers({
    onButtonClick: ({ count, setCount }) => () => setCount(count + 1)
  }),
  throttleHandler('onButtonClick', 1000)
)(Demo);
```

:tv: [Check out live demo](https://www.webpackbin.com/bins/-KqnLCuc43x1toFVDAJS).
