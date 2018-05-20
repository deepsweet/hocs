# :left_right_arrow: with-view-layout-props

[![npm](https://img.shields.io/npm/v/@hocs/with-view-layout-props.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-view-layout-props) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-view-layout-props&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-view-layout-props)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Dynamically map View layout dimensions to props using [`onLayout()`](https://facebook.github.io/react-native/docs/view.html#onlayout) handler.

## Install

```
yarn add @hocs/with-view-layout-props
```

## Usage

```js
withResizeObserverProps(
  mapStateToProps: (layoutDimensions: Object) => Object
  handlerName?: string
): HigherOrderComponent
```

Where:

* `layoutDimensions` – `{ width, height, x, y }`
* `handlerName` – in some cases you might want to change it. `'onlayout'` by default.

```js
import React from 'react';
import { View } from 'react-native';
import withViewLayoutProps from '@hocs/with-view-layout-props';

const Demo = ({ width, height, x, y, onLayout, ...props }) => (
  <View onLayout={onLayout} {...props}>
    { JSON.stringify({ width, height, x, y }) }
  </View>
);

export default withViewLayoutProps(
  ({ width, height, x, y }) => ({ width, height, x, y })
)(Demo);
```

## Related

* :left_right_arrow: [with-resize-observer-props](../with-resize-observer-props)
