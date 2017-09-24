import React from 'react'
import { compose, withState, withHandlers } from 'recompose'

import debounceHandler from '../src/'

const Demo = ({ count, onButtonClick }) => (
  <div>
    <h1>{count}</h1>
    <button onClick={onButtonClick}>CLICK ME FAST</button>
  </div>
)

export default compose(
  withState('count', 'setCount', 0),
  withHandlers({
    onButtonClick: ({ count, setCount }) => () => setCount(count + 1)
  }),
  debounceHandler('onButtonClick', 300)
)(Demo)
