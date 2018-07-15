/* eslint-disable no-console */
import React from 'react'
import { compose, withState, withHandlers } from 'recompose'

import withCallbackOnce from '../src'

const Demo = ({ count, onButtonClick }) => (
  <div>
    <h1>{count}</h1>
    <button onClick={onButtonClick}>decrement</button>
  </div>
)

export default compose(
  withState('count', 'setCount', 5),
  withHandlers({
    onButtonClick: ({ setCount, count }) => () => setCount(count - 1)
  }),
  withCallbackOnce(
    ({ count }) => count === 0,
    () => console.log('done!')
  )
)(Demo)
