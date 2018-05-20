# :mag: with-debugger

[![npm](https://img.shields.io/npm/v/@hocs/with-debugger.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-debugger) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-debugger&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-debugger)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Injects `debugger` into render.

## Install

```
yarn add @hocs/with-debugger
```

## Usage

```js
withDebugger: HigherOrderComponent
```

```js
import React from 'react';
import { compose, withProps } from 'recompose';
import withDebugger from '@hocs/with-debugger';

const Demo = () => (
  <h1>Hi</h1>
);

export default compose(
  withProps({ a: 1, b: 2, c: 3 }),
  withDebugger
)(Demo);
```
