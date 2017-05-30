const path = require('path'),
  pkg = require('./package.json'),
  webpack = require('webpack');

const plugins = [
  new webpack.NoEmitOnErrorsPlugin()
];

module.exports = {
  entry: {
    lib: Object.keys(pkg.dependencies),
    app: pkg.main
  },
  output: {
    filename: 'js/[name].[chunkhash:5].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: plugins,
  module: {
    loaders: []
  },
  stats: {
    colors: true
  }
};
