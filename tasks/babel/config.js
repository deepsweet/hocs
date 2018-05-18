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
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread'
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
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread'
  ]
}

exports.babelConfigReactNative = {
  babelrc: false,
  presets: [
    'react-native'
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread'
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
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread'
  ]
}
