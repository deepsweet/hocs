# `@hocs` [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs)

A collection of [Higher-Order Components](https://facebook.github.io/react/docs/higher-order-components.html) for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

> A Higher-Order Component is a function that takes a component and returns a new component.

## TOC

* [Packages](#packages)
  * :non-potable_water: [`omitProps`](#non-potable_water-omitprops--)
  * :recycle: [`withLifecycle`](#recycle-withlifecycle--)
  * :hourglass: [`debounceHandler`](#hourglass-debouncehandler--)
  * :hourglass: [`throttleHandler`](#hourglass-throttlehandler--)
  * …
* [Development](#development)

## Packages

### :non-potable_water: [`omitProps`](packages/omit-props) [![npm](https://img.shields.io/npm/v/@hocs/omit-props.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/omit-props) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/omit-props&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/omit-props)

```
yarn add recompose @hocs/omit-props
```

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
);

export default compose(
  withProps({ a: 1, b: 2, c: 3 }),
  omitProps('a', 'b')
)(Demo);
```

```
yarn start demo omit-props
```

### :recycle: [`withLifecycle`](packages/with-lifecycle) [![npm](https://img.shields.io/npm/v/@hocs/with-lifecycle.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/with-lifecycle) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/with-lifecycle&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/with-lifecycle)

Inspired by [Reassemble](https://github.com/wikiwi/reassemble), in comparison with [Recompose `lifecycle`](https://github.com/acdlite/recompose/blob/master/docs/API.md#lifecycle) this HOC provides a handy (and limited) way to use _some_ of [React Component Lifecycle](https://facebook.github.io/react/docs/react-component.html) methods such as:

* `onWillMount(props)`
* `onDidMount(props)`
* `onWillReceiveProps(props, nextProps)`
* `onWillUpdate(props, nextProps)`
* `onDidUpdate(prevProps, props)`
* `onWillUnmount(props)`

So no `this`, `setState` or even `constructor`, you have no direct access to class instance anymore (:tada:).

```
yarn add recompose @hocs/with-lifecycle
```

```js
withLifecycle(
  methods: Object
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withState } from 'recompose';
import withLifecycle from 'with-lifecycle';

const Demo = ({ isLoading }) => (
  <h1>{ isLoading ? 'Loading' : 'Done' }</h1>
);

export default compose(
  withState('isLoading', 'setLoading', false),
  withLifecycle({
    onDidMount({ setLoading }) {
      setLoading(true, () => {
        setTimeout(() => setLoading(false), 3000);
      })
    },
    onWillUnmount() {
      console.log('bye');
    }
  })
)(Demo);
```

In addition, it can handle a factory function which works like [Recompose `withHandlers`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withhandlers) factory:

```js
withLifecycle(
  methodsFactory: (initialProps: Object) => methods: Object
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

```
yarn start demo with-lifecycle
```

As a bonus you can "share" stuff across different lifecycle methods in that factory scope with `let mySharedStuff`, just like you did before with `this.mySharedStuff` using a class instance.

### :hourglass: [`debounceHandler`](packages/debounce-handler) [![npm](https://img.shields.io/npm/v/@hocs/debounce-handler.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/debounce-handler) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/debounce-handler&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/debounce-handler)

```
yarn add recompose @hocs/debounce-handler
```

```js
debounceHandler(
  handlerName: string,
  delay: ?number,
  leadingCall: ?boolean
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import debounceHandler from '@hocs/debounce-handler';

const Demo = ({ count, onButtonClick }) => (
  <div>
    <h1>{count}</h1>
    <button onClick={onButtonClick}>CLICK ME FAST</button>
  </div>
);

export default compose(
  withState('count', 'setCount', 0),
  withHandlers({
    onButtonClick: ({ count, setCount }) => () => setCount(count + 1)
  }),
  debounceHandler('onButtonClick', 300)
)(Demo);
```

```
yarn start demo debounce-handler
```

### :hourglass: [`throttleHandler`](packages/throttle-handler) [![npm](https://img.shields.io/npm/v/@hocs/throttle-handler.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/throttle-handler) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/throttle-handler&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/throttle-handler)

```
yarn add recompose @hocs/throttle-handler
```

```js
throttleHandler(
  handlerName: string,
  interval: ?number,
  leadingCall: ?boolean
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import throttleHandler from '@hocs/throttle-handler';

const Demo = ({ count, onButtonClick }) => (
  <div>
    <h1>{count}</h1>
    <button onClick={onButtonClick}>CLICK ME FAST</button>
  </div>
);

export default compose(
  withState('count', 'setCount', 0),
  withHandlers({
    onButtonClick: ({ count, setCount }) => () => setCount(count + 1)
  }),
  throttleHandler('onButtonClick', 300)
)(Demo);
```

```
yarn start demo throttle-handler
```

## Development

1. See how existing HOCs are done, especially their `package.json` files.
2. Create a new folder in `packages/`, let's say `with-foo`.
3. Put source code in `with-foo/src/`, it will be transpiled and bundled into `with-foo/dist/`, `with-foo/lib/` and `with-foo/es/`.
4. Put tests written with Jest in `with-foo/test/`.
5. Put demo in `with-foo/demo/`, it will be rendered and wrapped with HMR.
6. See [Start](https://github.com/start-runner/start).
6. Done.

```
yarn
yarn start build <package>
yarn start demo <package>
yarn start test
yarn start testWatch
yarn start lint
```
