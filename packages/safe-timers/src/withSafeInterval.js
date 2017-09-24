import safeTimerFactory from './safeTimerFactory'

export default safeTimerFactory(
  global.setInterval,
  global.clearInterval,
  'setSafeInterval',
  'withSafeInterval'
)
