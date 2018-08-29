# :hourglass: debounce-handler

[![npm](https://img.shields.io/npm/v/@hocs/debounce-handler.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/debounce-handler) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/debounce-handler&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/debounce-handler)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Helps to debounce handlers like `onChange`.

## Install

```
yarn add @hocs/debounce-handler
```

## Usage

```js
debounceHandler(
  handlerName: string,
  delay?: number|function<props>,
  leadingCall?: boolean
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import debounceHandler from '@hocs/debounce-handler';

const Demo = ({ count, onButtonClick, label }) => (
  <div className='demo'>
    {label || ''}
    <h1>{count}</h1>
    <button onClick={onButtonClick}>CLICK ME FAST</button>
  </div>
)

const Demo1 = compose(
  withState('count', 'setCount', 0),
  withHandlers({
    onButtonClick: ({ count, setCount }) => () => setCount(count + 1)
  }),
  debounceHandler('onButtonClick', 300)
)(Demo)

const Demo2 = compose(
  withState('count', 'setCount', 0),
  withHandlers({
    onButtonClick: ({ count, setCount }) => () => setCount(count + 1)
  }),
  debounceHandler('onButtonClick', (props) => props.debounce || 0)
)(Demo)

const MainDemo = () => (
  <div>
    <style>
      {
        `.demo {
          margin-bottom: 10px;
          border-style: dotted;
          border-radius: 10px;
          padding: 5px;
        }`
      }
    </style>
    <Demo1 label='Delay as argument' />
    <Demo2 label='Delay from props' debounce={300} />
    <Demo2 label='No delay (zero by default)' />
  </div>
)

export default MainDemo
```

:tv: [Check out live demo](https://codesandbox.io/s/qlmk8mlvk4).
