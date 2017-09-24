/* eslint-disable no-console */
import React from 'react'
import { compose, withState, withHandlers } from 'recompose'

import withCallbackOnChangeWhile from '../src/'

const Demo = ({ count, onButtonClick }) => (
  <div>
    <h1>{count}</h1>
    <button onClick={onButtonClick}>increment</button>
  </div>
)

export default compose(
  withState('count', 'setCount', 0),
  withHandlers({
    onButtonClick: ({ setCount, count }) => () => setCount(count + 1)
  }),
  withCallbackOnChangeWhile(
    'count',
    ({ count }) => count <= 5,
    ({ count }) => console.log(count)
  )
)(Demo)
