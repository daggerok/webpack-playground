/**
 * Created by mak on 6/25/16.
 */
const webpack = require('webpack');
const config = require('./webpack');

config.devtool = '#source-map';
config.plugins.push(new webpack.DefinePlugin({
  // Lots of library source code (like React) are based on process.env.NODE_ENV
  // (all development related code is wrapped inside a conditional that can be dropped if equal to "production"
  // this way you get your own react.min.js build)
  'process.env': { 'NODE_ENV': JSON.stringify('production') }
}));

module.exports = config;
