import React from 'react'

import withMatchMediaProps from '../src/'

const Demo = (props) => (
  <h1>props: {JSON.stringify(props)}</h1>
)

export default withMatchMediaProps({
  isSmallScreen: {
    maxWidth: 500
  },
  isHighDpiScreen: {
    minResolution: '192dpi'
  }
})(Demo)
