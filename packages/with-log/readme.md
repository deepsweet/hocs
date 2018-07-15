# :mag: with-log

[![npm](https://img.shields.io/npm/v/@hocs/with-log.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-log) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-log&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-log)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Injects `console.log` with props or any custom message into render.

## Install

```
yarn add @hocs/with-log
```

## Usage

```js
withLog(
  getMessageToLog?: (props: Object) => any
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withProps } from 'recompose';
import withLog from '@hocs/with-log';

const Demo = () => (
  <h1>Hi</h1>
);

export default compose(
  withProps({ a: 1, b: 2, c: 3 }),
  withLog(({ a }) => `a = ${a}`)
)(Demo);
```

:tv: [Check out live demo](https://codesandbox.io/s/pk7o259910).
