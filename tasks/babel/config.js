const browsers = [
  'last 2 versions',
  'not ie <= 10'
]
const node = '6'

exports.babelConfigBrowserESM = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { browsers },
        modules: false
      }
    ],
    '@babel/preset-react'
  ]
}

exports.babelConfigNodeCJS = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node }
      }
    ],
    '@babel/preset-react'
  ]
}

exports.babelConfigReactNative = {
  babelrc: false,
  presets: [
    'react-native'
  ]
}

exports.babelConfigJest = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-react'
  ]
}
