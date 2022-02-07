const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  entry: [
    './client/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    host: 'localhost',
    open: true,
    historyApiFallback: true,
    proxy: {
      '/members/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/employees/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/interviews/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/recruitment/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/auth/**': {
        target: 'http://localhost:4000/',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      //css
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      //images
      { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: 'asset/resource' },
      //js for babel
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    },
    ),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};