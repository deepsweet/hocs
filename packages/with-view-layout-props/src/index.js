import { createElement, Component } from 'react'
import { setDisplayName, wrapDisplayName } from 'recompose'

const withViewLayoutProps = (mapStateToProps, handlerName = 'onLayout') => (Target) => {
  class WithViewLayoutProps extends Component {
    constructor (props, context) {
      super(props, context)

      this.state = mapStateToProps({})
      this.onLayout = this.onLayout.bind(this)
    }

    onLayout ({ nativeEvent: { layout } }) {
      this.setState(
        mapStateToProps(layout)
      )
    }

    render () {
      return createElement(Target, {
        ...this.props,
        ...this.state,
        [handlerName]: this.onLayout
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'withViewLayoutProps'))(WithViewLayoutProps)
  }

  return WithViewLayoutProps
}

export default withViewLayoutProps
