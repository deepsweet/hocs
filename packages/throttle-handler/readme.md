# :hourglass: throttle-handler

[![npm](https://img.shields.io/npm/v/@hocs/throttle-handler.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/throttle-handler) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/throttle-handler&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/throttle-handler)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Helps to throttle handlers like `onChange`.

## Install

```
yarn add @hocs/throttle-handler
```

## Usage

```js
throttleHandler(
  handlerName: string,
  interval?: number|function<props>,
  leadingCall?: boolean
): HigherOrderComponent
```

```js
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
  throttleHandler('onButtonClick', 1000)
)(Demo)

const Demo2 = compose(
  withState('count', 'setCount', 0),
  withHandlers({
    onButtonClick: ({ count, setCount }) => () => setCount(count + 1)
  }),
  throttleHandler('onButtonClick', (props) => props.throttle || 0)
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
    <Demo2 label='Delay from props' throttle={300} />
    <Demo2 label='No delay (zero by default)' />
  </div>
)

export default MainDemo
```

:tv: [Check out live demo](https://codesandbox.io/s/q96856wkow).
