# :left_right_arrow: with-resize-observer-props

[![npm](https://img.shields.io/npm/v/@hocs/with-resize-observer-props.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-resize-observer-props) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-resize-observer-props&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-resize-observer-props)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Dynamically map *component* size and position changes to props using [Resize Observer API](https://github.com/WICG/ResizeObserver) ([Can I use?](https://caniuse.com/#feat=resizeobserver) :see_no_evil:).

## Install

```
yarn add recompose @hocs/with-resize-observer-props
```

## Usage

```js
withResizeObserverProps(
  callback: (ownerProps: Object) => (observerState: Object) => Object | void,
  onRefHandlerName?: string
): HigherOrderComponent
```

Where:

* `observerState` – [`contentRect` object](https://wicg.github.io/ResizeObserver/#dom-resizeobserverentry-contentrect) with `width`, `height`, `top` and `left` properties.
* `onRefHandlerName` – in some cases you might want to change it. `'onRef'` by default.

```js
import React from 'react';
import { compose, withProps } from 'recompose';
import 'resize-observer-polyfill/dist/ResizeObserver.global';
import withResizeObserverProps from '@hocs/with-resize-observer-props';

const Demo = ({ onRef, hasNarrowWidth, hasLongHeight }) => (
  <textarea
    readOnly={true}
    ref={onRef}
    style={{ width: 400, height: 100 }}
    value={`resize me!\n${JSON.stringify({ hasNarrowWidth, hasLongHeight })}`}
  />
);

export default compose(
  withProps({
    myWidthBreakpoint: 500,
    myHeightBreakpoint: 300
  }),
  withResizeObserverProps(
    ({ myWidthBreakpoint, myHeightBreakpoint }) => ({ width, height }) => ({
      hasNarrowWidth: width < myWidthBreakpoint,
      hasLongHeight: height >= myHeightBreakpoint
    })
  )
)(Demo);
```

It uses "shallow equal" under the hood to compare computed props so target component will be re-rendered only when it needs to.

In addition, it's possible to not return computed props from a callback at all. It's very usefull if you need just to propagate size changes to "outside" of component without self re-renders, for example to animate width/height with [react-motion](https://github.com/chenglou/react-motion) or similar libs.

```js
withResizeObserverProps(
  ({ onResize }) => onResize
)
```

:tv: [Check out live demo](https://www.webpackbin.com/bins/-KsUVUj_IHaULBEW0oKx).

## Notes

* You still might need a [polyfill](https://github.com/que-etc/resize-observer-polyfill) – contains many details on why this particular polyfill is just technically amazing.
* "`ref` approach" is used instead of `findDOMNode(this)` because it's just [less evil](https://facebook.github.io/react/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components). Also it's more flexible so you can pass it to whatever children you want.
* Target Component will be just passed through on unsupported platforms (i.e. `global.ResizeObserver` is not a function) like IE9, JSDOM (so Jest as well) or with Server-Side Rendering. This means that there will be no boolean props (i.e. `undefined`) which might be expected, but you can take care of it using Recompose [`defaultProps`](https://github.com/acdlite/recompose/blob/master/docs/API.md#defaultprops) HOC if it's really necessary.

## Related

* :left_right_arrow: [with-match-media-props](../with-match-media-props)
* :eyes: [with-intersection-observer-props](../with-intersection-observer-props)
