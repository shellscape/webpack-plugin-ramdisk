const { WebpackPluginRamdisk } = require('../../../lib/');

module.exports = {
  context: __dirname,
  entry: './app.js',
  mode: 'development',
  output: {
    filename: './output.js',
    path: '/output',
    publicPath: 'output/'
  },
  plugins: [new WebpackPluginRamdisk()]
};
