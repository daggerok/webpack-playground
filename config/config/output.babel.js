import { resolve } from 'path';

export const publicPath = '/';

export default {
  publicPath,
  path: resolve('./dist'),
  // filename: '[name].bundle.js',
  // chunkFilename: '[id].chunk.js',
  filename: '[name].bundle.js?ver=[chunkhash]',
  chunkFilename: '[name]-[id].chunk.js?ver=[chunkhash]',
  sourceMapFilename: 'maps/[name].map?ver=[chunkhash]',
  // filename: '[name]-[hash].js',
  // sourceMapFilename: 'maps/[name]-[hash].map',
  jsonpFunction: 'wj', // use wj instead of webpackJsonp
};
