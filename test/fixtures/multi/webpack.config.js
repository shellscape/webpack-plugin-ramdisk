const { resolve } = require('path');

const { WebpackPluginRamdisk } = require('../../../lib/');

module.exports = [
  {
    context: __dirname,
    entry: './app.js',
    mode: 'development',
    output: {
      filename: './dist-app.js',
      path: '/output',
      publicPath: 'output/'
    },
    plugins: [new WebpackPluginRamdisk({ name: 'multiconfig' })]
  },
  {
    context: __dirname,
    entry: './worker.js',
    mode: 'development',
    output: {
      filename: './dist-worker.js',
      path: resolve(__dirname, './output'),
      publicPath: 'output/'
    }
  }
];
