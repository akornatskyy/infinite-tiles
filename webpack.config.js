const prod = process.env.NODE_ENV && process.env.NODE_ENV.startsWith('prod');
const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

const plugins = [
  new HtmlPlugin({
    title: pkg.description
  }),
  new webpack.NoEmitOnErrorsPlugin()
];

if (prod) {
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin(),
      new UglifyJsPlugin());
}

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: {
    app: pkg.main,
    lib: [
      './lib/staggered-map',
      './lib/staggered-map/mixins',
      './lib/staggered-map/renderer'
    ]
  },
  output: {
    filename: 'js/[name].[chunkhash:5].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      api: './api/' + (process.env.API || 'mock')
    }
  },
  plugins: plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          name: 'lib',
          minSize: 0
        }
      }
    }
  },
  module: {
    rules: [{
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

if (process.env.API === 'ws') {
  module.exports.entry.lib.push('msgpack-lite');
  if (process.env.WS_HOST) {
    module.exports.module.rules.push({
      test: path.join(__dirname, 'app', 'api', 'ws.js'),
      loader: 'string-replace-loader',
      query: {
        search: 'host = .+$',
        replace: 'host = "' + (process.env.WS_HOST || '') + '"',
        flags: 'm',
        strict: true
      }
    });
  }
}
