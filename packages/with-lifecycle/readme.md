# :recycle: with-lifecycle

[![npm](https://img.shields.io/npm/v/@hocs/with-lifecycle.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-lifecycle) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-lifecycle&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-lifecycle)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Inspired by [Reassemble](https://github.com/wikiwi/reassemble), in comparison with Recompose [`lifecycle`](https://github.com/acdlite/recompose/blob/master/docs/API.md#lifecycle) this HOC provides a handy (and limited) way to use _some_ of [React Component Lifecycle](https://reactjs.org/docs/react-component.html) methods such as:

* `onConstructor(props)`
* `onWillMount(props)`
* `onDidMount(props)`
* `onReceiveProps(props, nextProps)` – [`getDerivedStateFromProps`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) as a callback but without returned state
* `onGetSnapshotBeforeUpdate(prevProps, props)` – any returned value will be passed as `snapshot` parameter to `onDidUpdate`
* `onDidUpdate(prevProps, props, snapshot)`
* `onWillUnmount(props)`
* `onDidCatch(error, info)`

So no `this`, you have no direct access to class instance anymore (:tada:).

## Install

```
yarn add @hocs/with-lifecycle
```

## Usage

```js
withLifecycle(
  methods: Object
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withState } from 'recompose';
import withLifecycle from '@hocs/with-lifecycle';

const Demo = ({ isLoading }) => (
  <h1>{ isLoading ? 'Loading' : 'Done' }</h1>
);

export default compose(
  withState('isLoading', 'setLoading', true),
  withLifecycle({
    onDidMount({ setLoading }) {
      setLoading(true, () => {
        setTimeout(() => setLoading(false), 3000);
      })
    },
    onReceiveProps(props, nextProps) {
      console.log(`isLoading: ${props.isLoading} → ${nextProps.isLoading}`);
    }
  })
)(Demo);
```

In addition, it can handle a factory function which works like Recompose [`withHandlers`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withhandlers) factory:

```js
withLifecycle(
  methodsFactory: (initialProps: Object) => Object
): HigherOrderComponent
```

```js
withLifecycle(
  ({ shouldLoadOnMount }) => {
    if (shouldLoadOnMount) {
      return {
        onDidMount({ setLoading }) {
          setLoading(true, () => {
            setTimeout(() => setLoading(false), 1000);
          })
        }
      };
    }
  }
)
```

As a bonus you can "share" stuff across different lifecycle methods in that factory scope with `let mySharedStuff`, just like you did before with `this.mySharedStuff` using a class instance.

:tv: [Check out live demo](https://codesandbox.io/s/1z189o79vj).
