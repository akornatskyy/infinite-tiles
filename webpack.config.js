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
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  stats: {
    colors: true
  },
  devServer: {
    host: '127.0.0.1',
    compress: true
  }
};
