/* eslint-disable no-console */
import React from 'react'
import { compose, withHandlers } from 'recompose'

import { withSafeTimeout } from '../src/'

const sayHi = () => console.log('Hi!')

const Target = ({ onButtonClick }) => (
  <button onClick={onButtonClick}>Start 2 secs timeout</button>
)

export default compose(
  withSafeTimeout,
  withHandlers({
    onButtonClick: ({ setSafeTimeout }) => () => setSafeTimeout(sayHi, 2000)
  })
)(Target)
