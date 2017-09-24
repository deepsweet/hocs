import React from 'react'
import { compose, withState, withHandlers } from 'recompose'

import Target from './Target'

const Demo = ({ targetKey, onButtonClick }) => (
  <div>
    <Target key={targetKey} />
    <button onClick={onButtonClick}>Remount</button>
  </div>
)

export default compose(
  withState('targetKey', 'setTargetKey', 0),
  withHandlers({
    onButtonClick: ({ setTargetKey, targetKey }) => () => setTargetKey(targetKey + 1)
  })
)(Demo)
