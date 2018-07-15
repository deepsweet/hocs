# :watch: safe-timers

[![npm](https://img.shields.io/npm/v/@hocs/safe-timers.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/safe-timers) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/safe-timers&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/safe-timers)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Provides safe versions of `setTimeout`, `setInterval`, `requestAnimationFrame` and `requestIdleCallback` which will be cleared/cancelled automatically before component is unmounted.

Inspired by [react-timer-mixin](https://github.com/reactjs/react-timer-mixin).

## Install

```
yarn add @hocs/safe-timers
```

## Usage

```js
withSafeTimeout: HigherOrderComponent
withSafeInterval: HigherOrderComponent
withSafeAnimationFrame: HigherOrderComponent
withSafeIdleCallback: HigherOrderComponent
```

Basic wrapper to remount Target component when we want:

```js
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

import Target from './Target';

const Demo = ({ targetKey, onButtonClick }) => (
  <div>
    <Target key={targetKey}/>
    <button onClick={onButtonClick}>Remount</button>
  </div>
);

export default compose(
  withState('targetKey', 'setTargetKey', 0),
  withHandlers({
    onButtonClick: ({ setTargetKey, targetKey }) => () => setTargetKey(targetKey + 1)
  })
)(Demo);
```

Target component which is using timeouts:

```js
import React from 'react';
import { compose, withHandlers } from 'recompose';
import { withSafeTimeout } from '@hocs/safe-timers';

const sayHi = () => console.log('Hi!');

const Target = ({ onButtonClick }) => (
  <button onClick={onButtonClick}>Start 2 secs timeout</button>
);

export default compose(
  withSafeTimeout,
  withHandlers({
    onButtonClick: ({ setSafeTimeout }) => () => setSafeTimeout(sayHi, 2000)
  })
)(Target);
```

:tv: [Check out live demo](https://codesandbox.io/s/ly410pk8q7).

The same approach goes for all HOCs in this package:

* `withSafeTimeout` provides `setSafeTimeout` prop
* `withSafeInterval` provides `setSafeInterval` prop
* `withSafeAnimationFrame` provides `requestSafeAnimationFrame` prop
* `withSafeIdleCallback` provides `requestSafeIdleCallback` prop

So basically all you need to do in comparison with native timers is to add `Safe` word.

### Clear / Cancel

In order to keep your props as clean as possible, to manually clear/cancel a safe timer its "unsubscriber" is provided as a result of that timer call:

```js
const clearSafeInterval = setSafeInterval(() => {}, 100);

clearSafeInterval();
```

(How this pattern is called? In opposite to returning some unique `id`).

## Notes

### `requestAnimationFrame`

You might still need a [polyfill](https://github.com/chrisdickinson/raf) ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), [Can I use?](https://caniuse.com/#feat=requestanimationframe)).

### `requestIdleCallback`

You might still need a [polyfill](https://github.com/aFarkas/requestIdleCallback) ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback), [Can I use?](https://caniuse.com/#feat=requestidlecallback)).

### `setImmediate`

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate):

> This method is not expected to become standard, and is only implemented by recent builds of Internet Explorer and Node.js 0.10+. It meets resistance both from Gecko (Firefox) and Webkit (Google/Apple).
