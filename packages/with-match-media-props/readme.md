# :left_right_arrow: with-match-media-props

[![npm](https://img.shields.io/npm/v/@hocs/with-match-media-props.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-match-media-props) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-match-media-props&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-match-media-props)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Dynamically map [CSS Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) matches to boolean props using `window.matchMedia()` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), [Can I use](https://caniuse.com/#search=matchmedia)).

## Install

```
yarn add recompose @hocs/with-match-media-props
```

## Usage

```js
withMatchMediaProps(
  mediaMatchers: {
    [propName: string]: Object
  }
): HigherOrderComponent
```

```js
import React from 'react';
import withMatchMediaProps from '@hocs/with-match-media-props';

const Demo = (props) => (
  <h1>props: {JSON.stringify(props)}</h1>
  // props: {"isSmallScreen":false,"isRetina":true}
);

export default withMatchMediaProps({
  isSmallScreen: {
    maxWidth: 500
  },
  isHighDpiScreen: {
    minResolution: '192dpi'
  }
})(Demo);
```

Check out [json2mq](https://github.com/akiran/json2mq) for query syntax details. It supports much more complex stuff than in example above.

:information_source: Target Component will be just passed through on unsupported platforms (i.e. `global.matchMedia` is not a function) like IE9, JSDOM (so Jest as well) or with Server-Side Rendering. This means that there will be no boolean props (i.e. `undefined`) which might be expected, but you can take care of it using Recompose [`defaultProps`](https://github.com/acdlite/recompose/blob/master/docs/API.md#defaultprops) HOC if it's really necessary.

:tv: [Check out live demo](https://www.webpackbin.com/bins/-KqnRPrbih9tWCY9T1g5).
