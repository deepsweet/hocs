const { createTransformer } = require('babel-jest')
const { babelConfigJest } = require('../babel/config')

module.exports = createTransformer(babelConfigJest)
