# :non-potable_water: omit-props

[![npm](https://img.shields.io/npm/v/@hocs/omit-props.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/omit-props) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/omit-props&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/omit-props)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Helps to omit unnecessary context prop, state setters or anything else you don't want to propagate and `{...spread}` to Component.

## Install

```
yarn add @hocs/omit-props
```

## Usage

```js
omitProps(
  ...props: Array<string>
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withProps } from 'recompose';
import omitProps from '@hocs/omit-props';

const Demo = (props) => (
  <h1>props: {JSON.stringify(props)}</h1>
  // props: {"c":3}
);

export default compose(
  withProps({ a: 1, b: 2, c: 3 }),
  omitProps('a', 'b')
)(Demo);
```

:tv: [Check out live demo](https://codesandbox.io/s/6jyxnnoorr).
