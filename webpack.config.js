const prod = process.env.NODE_ENV && process.env.NODE_ENV.startsWith('prod'),
  path = require('path'),
  pkg = require('./package.json'),
  webpack = require('webpack'),
  HtmlPlugin = require('html-webpack-plugin');

const plugins = [
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'lib',
  //   minChunks: Infinity
  // }),
  new HtmlPlugin({
    title: pkg.description
  }),
  new webpack.NoEmitOnErrorsPlugin()
];

if (prod) {
  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
}

module.exports = {
  entry: {
    //lib: Object.keys(pkg.dependencies),
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
    }, {
      test: /\.(jpg|png)$/,
      loader: 'file-loader',
      query: {
        name: '[path][name].[hash:5].[ext]'
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
