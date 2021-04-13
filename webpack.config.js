const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const openBrowser = require('react-dev-utils/openBrowser');

const StylelintPlugin = require('stylelint-webpack-plugin');

// for mobile testing
const host = '0.0.0.0';
const port = 4000;

module.exports = (_, argv) => {
  const isDevelopment = argv.mode === 'development';
  const config = {
    entry: ['react-hot-loader/patch', './src/index.tsx'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
          exclude: /\.module\.css$/,
        },
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            'postcss-loader',
          ],
          include: /\.module\.css$/,
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: isDevelopment
                    ? '[local]--[hash:base64:6]'
                    : '[hash:base64:6]',
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    devServer: {
      contentBase: './dist',
      host,
      port,
      historyApiFallback: true,
      hot: true,
      publicPath: '/',
      overlay: true,
      after: () => {
        openBrowser(`http://${host}:${port}`);
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html', //source html
        PUBLIC_URL: '',
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
      new MiniCssExtractPlugin(),
      new StylelintPlugin({
        configFile: '.stylelintrc.json',
        context: 'src',
        files: '**/*.scss',
      }),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = '[name].[hash].js';
  }
  return config;
};
