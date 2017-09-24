import safeTimerFactory from './safeTimerFactory'

export default safeTimerFactory(
  global.requestIdleCallback,
  global.cancelIdleCallback,
  'requestSafeIdleCallback',
  'withSafeIdleCallback'
)
