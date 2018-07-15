# :eyes: with-intersection-observer-props

[![npm](https://img.shields.io/npm/v/@hocs/with-intersection-observer-props.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-intersection-observer-props) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-intersection-observer-props&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-intersection-observer-props)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Dynamically map visibility of a component to boolean props using [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) ([Can I use?](https://caniuse.com/#feat=intersectionobserver)).

## Install

```
yarn add @hocs/with-intersection-observer-props
```

## Usage

```js
withIntersectionObserverProps(
  intersectionMatchers: {
    [propName: string]: number
  },
  options?: Object,
  onRefName?: string
): HigherOrderComponent
```

Where:
* intersection matcher's value is a single [`threshold`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Thresholds)
* `options` – object with [`root` and `rootMargin`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#The_intersection_root_and_root_margin).
* `onRefName` – in some cases you might want to change it. `'onRef'` by default.

Basic wrapper to make Target component hidden behind scroll by default:

```js
import React from 'react';

import Target from './Target';

const Demo = () => (
  <div style={{ height: '300px', overflow: 'scroll', fontSize: 32, border: '1px solid black' }}>
    <div style={{ height: '300px' }}>Scroll me down</div>
    <Target style={{ backgroundColor: 'RebeccaPurple', color: 'white' }}/>
    <div style={{ height: '300px' }}/>
  </div>
);

export default Demo;
```

Target component which is using Intersection Observer:

```js
import React from 'react';
import 'intersection-observer';
import withIntersectionObserverProps from '@hocs/with-intersection-observer-props';

const Target = ({ isOnePixelVisible, isHalfVisible, isFullVisible, onRef }) => (
  <div ref={onRef} style={{ backgroundColor: 'RebeccaPurple', color: 'white' }}>
    <p>{JSON.stringify({ isOnePixelVisible })}</p>
    <p>{JSON.stringify({ isHalfVisible })}</p>
    <p>{JSON.stringify({ isFullVisible })}</p>
  </div>
);

export default withIntersectionObserverProps({
  isOnePixelVisible: 0.0,
  isHalfVisible: 0.5,
  isFullVisible: 1.0
})(Target);
```

:tv: [Check out live demo](https://codesandbox.io/s/p9npqy54jx).

## Notes

* You might still need a [polyfill](https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill).
* It's impossible to avoid first render with undefined intersection props.
* Target Component will be just passed through on unsupported platforms (i.e. `global.IntersectionObserver` is not a function) like JSDOM (so Jest as well) or with Server-Side Rendering. This means that there will be no boolean props (i.e. `undefined`) which might be expected, but you can take care of it using Recompose [`defaultProps`](https://github.com/acdlite/recompose/blob/master/docs/API.md#defaultprops) HOC if it's really necessary.

## Related

* :left_right_arrow: [with-resize-observer-props](../with-resize-observer-props)
* :left_right_arrow: [with-match-media-props](../with-match-media-props)
