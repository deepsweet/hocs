const browsers = [
  'last 2 versions',
  'not ie <= 10'
]
const node = '6'

exports.babelConfigBrowserESM = {
  babelrc: false,
  presets: [
    [
      'env',
      {
        targets: { browsers },
        modules: false
      }
    ],
    'react'
  ],
  plugins: [
    'transform-object-rest-spread'
  ]
}

exports.babelConfigNodeCJS = {
  babelrc: false,
  presets: [
    [
      'env',
      {
        targets: { node }
      }
    ],
    'react'
  ],
  plugins: [
    'transform-object-rest-spread'
  ]
}

exports.babelConfigReactNative = {
  babelrc: false,
  presets: [
    'react-native'
  ],
  plugins: [
    'transform-object-rest-spread'
  ]
}

exports.babelConfigJest = {
  babelrc: false,
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    'react'
  ],
  plugins: [
    'transform-object-rest-spread'
  ]
}
