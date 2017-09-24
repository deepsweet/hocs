import React from 'react'

import Target from './Target'

const Demo = () => (
  <div style={{ height: '300px', overflow: 'scroll', fontSize: 32, border: '1px solid black' }}>
    <div style={{ height: '300px' }}>Scroll me down</div>
    <Target />
    <div style={{ height: '300px' }} />
  </div>
)

export default Demo
