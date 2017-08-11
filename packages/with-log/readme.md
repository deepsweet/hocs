# :scroll: with-log

[![npm](https://img.shields.io/npm/v/@hocs/with-logs.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-logs) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-logs&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-logs)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Helps to debug compositions of HOCs by logging the `displayName`, the props and a custom message.

## Install

```
yarn add recompose @hocs/with-logs
```

## Usage

```js
withLog(
  message: String
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withProps, flattenProp, setDisplayName } from 'recompose';

import withLog from '@hocs/with-log';

const Demo = (props) => (
  <h1>props: {JSON.stringify(props)}</h1>
);

export default compose(
  withProps({ nested: { a: 'a', b: 'b' }, b: 2 }),
  flattenProp('nested'),
  withLog('wait, what are the props and the displayName here?'),
  withProps({ a: 1, c: 3 }),
  setDisplayName('Demo')
)(Demo);
```
