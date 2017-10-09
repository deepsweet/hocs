import Start from 'start'
import reporter from 'start-pretty-reporter'
import parallel from 'start-parallel'
import env from 'start-env'
import jest from 'start-jest'
import files from 'start-files'
import clean from 'start-clean'
import read from 'start-read'
import babel from 'start-babel'
import write from 'start-write'
import eslint from 'start-eslint'
import codecov from 'start-codecov'
import webpackDevServer from 'start-webpack-dev-server'

const start = Start(reporter())

export const buildNodeCJS = (packageName) => {
  const { babelConfigNodeCJS } = require('./babel/config')

  return start(
    files(`packages/${packageName}/src/**/*.js`),
    read(),
    babel(babelConfigNodeCJS),
    write(`packages/${packageName}/build/node-cjs/`)
  )
}

export const buildBrowserESM = (packageName) => {
  const { babelConfigBrowserESM } = require('./babel/config')

  return start(
    files(`packages/${packageName}/src/**/*.js`),
    read(),
    babel(babelConfigBrowserESM),
    write(`packages/${packageName}/build/browser-esm/`)
  )
}

export const buildReactNative = (packageName) => {
  const { babelConfigReactNative } = require('./babel/config')

  return start(
    files(`packages/${packageName}/src/**/*.js`),
    read(),
    babel(babelConfigReactNative),
    write(`packages/${packageName}/build/react-native/`)
  )
}

export const build = (packageName) => {
  const pkg = require(`../packages/${packageName}/package.json`)
  const targets = [
    pkg.main && 'buildNodeCJS',
    pkg.browser && 'buildBrowserESM',
    pkg['react-native'] && 'buildReactNative'
  ].filter((target) => target)

  return start(
    files(`packages/${packageName}/build/`),
    clean(),
    env('NODE_ENV', 'production'),
    parallel(...targets)(packageName)
  )
}

export const lint = () => start(
  files([
    'tasks/**/*.js',
    'packages/*/@(src|test|demo)/**/*.js'
  ]),
  eslint({
    cache: true,
    cacheLocation: 'node_modules/.cache/eslint'
  })
)

export const test = () => {
  const { jestConfigFull } = require('./jest/config')

  return start(
    env('NODE_ENV', 'test'),
    files('coverage/'),
    clean(),
    jest(jestConfigFull)
  )
}

export const testWatch = () => {
  const { jestConfigWatch } = require('./jest/config')

  return start(
    env('NODE_ENV', 'test'),
    files('coverage/'),
    clean(),
    jest(jestConfigWatch)
  )
}

export const ci = () => start(
  lint,
  test,
  files('coverage/lcov.info'),
  read(),
  codecov()
)

export const demo = (packageName) => {
  const webpackConfig = require('./demo/config').default

  return start(
    env('NODE_ENV', 'development'),
    webpackDevServer(webpackConfig(packageName), { hot: true })
  )
}
