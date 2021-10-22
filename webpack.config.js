const path = require('path');
const pkg = require('./package.json');
const HtmlPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const plugins = [
  new HtmlPlugin({
    title: pkg.description
  })
];

module.exports = (env, argv) => {
  const api = env && env.API || 'mock';
  const devMode = argv.mode !== 'production';
  const config = {
    mode: argv.mode ? argv.mode : 'development',
    entry: {
      app: pkg.main
    },
    output: {
      filename: 'js/[name].[chunkhash:5].js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      alias: {
        api: './api/' + api
      }
    },
    devtool: devMode ? 'source-map' : undefined,
    plugins: plugins,
    optimization: {
      splitChunks: {
        cacheGroups: {
          lib: {
            name: 'lib',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]|[\\/]lib[\\/]/
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            output: {
              comments: false,
            },
          },
        })
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[md5:contenthash:base58:5].[ext]',
          }
        }
      ]
    },
    devServer: {
      host: '127.0.0.1',
      compress: true
    }
  };

  if (api === 'ws' && env.WS_HOST) {
    config.module.rules.push({
      test: path.join(__dirname, 'app', 'api', 'ws.js'),
      loader: 'string-replace-loader',
      options: {
        search: 'host = .+$',
        replace: `host = "${env.WS_HOST}"`,
        flags: 'm',
        strict: true
      }
    });
  }

  return config;
};
