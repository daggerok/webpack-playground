/**
 * Created by mak on 6/25/16.
 */
const webpack = require('webpack');
const devServer = require('./devServer');

module.exports = {
  entry: {
    app: './src/app.jsx',
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: './dist',
    filename: '[name].js',
    publicPath: "./dist/"
  },
  resolve: {
    extensions: ['', '.babel.js', '.es6', '.jsx', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.(jsx|es6|babel.js)$/,
        exclude: /node_modules/,
        include: './src',
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(jsx|babel.js|es6)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'babel-preset-es2015',
            'babel-preset-react'
          ],
          plugins: [
            'react-html-attrs'
          ]
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader?limit=20000'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      /* chunkName= */"vendor",
      /* filename= */ "vendor.js"
    )
  ],
  devServer: devServer
};
