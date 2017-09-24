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

exports.babelConfigBrowserCJS = {
  babelrc: false,
  presets: [
    [
      'env',
      {
        targets: { browsers }
      }
    ],
    'react'
  ],
  plugins: [
    'transform-object-rest-spread'
  ]
}

exports.babelConfigServerESM = {
  babelrc: false,
  presets: [
    [
      'env',
      {
        targets: { node },
        modules: false
      }
    ],
    'react'
  ],
  plugins: [
    'transform-object-rest-spread'
  ]
}

exports.babelConfigServerCJS = {
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

exports.babelConfigRN = {
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
