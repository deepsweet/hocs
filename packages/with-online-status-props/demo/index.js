import React from 'react'

import withOnlineStatusProps from '../src/'

const Demo = (props) => (
  <h1>props: {JSON.stringify(props)}</h1>
)

export default withOnlineStatusProps(
  ({ isOnline, isOffline }) => ({ isOnline, isOffline })
)(Demo)
