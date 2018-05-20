import { createElement } from 'react'
import getDisplayName from 'react-display-name'
import omit from 'just-omit'

const omitProps = (...propsToOmit) => (Target) => {
  const OmitProps = (props) => createElement(Target, (omit(props, propsToOmit)))

  if (process.env.NODE_ENV !== 'production') {
    OmitProps.displayName = `omitProps(${getDisplayName(Target)})`
  }

  return OmitProps
}

export default omitProps
