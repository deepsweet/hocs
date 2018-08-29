import React from 'react'
import { compose, withState, withHandlers } from 'recompose'

import throttleHandler from '../src/'

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
