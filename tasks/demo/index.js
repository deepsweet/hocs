import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Demo from '~/demo/'

const renderDemo = (Component) => render(
  <AppContainer>
    <Component />
  </AppContainer>,
  global.document.getElementById('root')
)

renderDemo(Demo)

if (module.hot) {
  module.hot.accept('~/demo/', () => {
    renderDemo(require('~/demo/').default)
  })
}
