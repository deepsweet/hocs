# :electric_plug: with-online-status-props

[![npm](https://img.shields.io/npm/v/@hocs/with-online-status-props.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-online-status-props) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-online-status-props&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-online-status-props)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Dynamically map online/offline status to props using [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine) ([Can I use?](https://caniuse.com/#feat=online-status)).

## Install

```
yarn add @hocs/with-online-status-props
```

## Usage

```js
withOnlineStatusProps(
  mapStatusToProps: (onlineStatus: Object) => Object,
): HigherOrderComponent
```

```js
import React from 'react';
import withOnlineStatusProps from '@hocs/with-online-status-props';

const Demo = (props) => (
  <h1>props: {JSON.stringify(props)}</h1>
);

export default withOnlineStatusProps(
  ({ isOnline, isOffline }) => ({ isOnline, isOffline })
)(Demo);
```

:tv: [Check out live demo](https://codesandbox.io/s/2jx0x9r3rp).

## Notes

* Target Component will be just passed through on unsupported platforms (i.e. `global.navigator.onLine` is `undefined`) like with Server-Side Rendering. This means that there will be no status (i.e. `undefined`) which might be expected, but you can take care of it using Recompose [`defaultProps`](https://github.com/acdlite/recompose/blob/master/docs/API.md#defaultprops) HOC if it's really necessary.
