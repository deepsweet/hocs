/* eslint-disable no-console */
import React from 'react'
import { compose, withState, withHandlers } from 'recompose'

import preventHandlersDefault from '../src/'

const submitAction = (value) => console.log(`Submit: ${value}`)

const Demo = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input value={value} onChange={onChange} />
    <button>Submit</button>
  </form>
)

export default compose(
  withState('value', 'setValue', ''),
  withHandlers({
    onChange: ({ setValue }) => (e) => setValue(e.target.value),
    onSubmit: ({ value }) => () => submitAction(value)
  }),
  preventHandlersDefault('onSubmit')
)(Demo)
