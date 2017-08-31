# :electric_plug: with-online-status-props

[![npm](https://img.shields.io/npm/v/@hocs/with-online-status-props.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-online-status-props) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-online-status-props&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-online-status-props)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Dynamically map online/offline status to boolean props using [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine) ([Can I use?](https://caniuse.com/#feat=online-status)).

## Install

```
yarn add recompose @hocs/with-online-status-props
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

:tv: [Check out live demo](https://www.webpackbin.com/bins/-KsrcK14q0MkyZZIFquj).
