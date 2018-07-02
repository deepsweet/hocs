/* eslint-disable no-console */
import React from 'react'
import { compose, withState } from 'recompose'

import withLifecycle from '../src/'

const Demo = ({ isLoading }) => (
  <h1>{ isLoading ? 'Loading…' : 'Done' }</h1>
)

export default compose(
  withState('isLoading', 'setLoading', true),
  withLifecycle({
    onDidMount ({ setLoading }) {
      setTimeout(() => setLoading(false), 3000)
    },
    onReceiveProps (props, nextProps) {
      console.log(`isLoading: ${props.isLoading} → ${nextProps.isLoading}`)
    }
  })
)(Demo)
