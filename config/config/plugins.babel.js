import {
  optimize,
  DefinePlugin,
  ProvidePlugin,
  NoErrorsPlugin, } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import { publicPath } from './output.babel.js';

export const extractTextWebpackPlugin = new ExtractTextWebpackPlugin({
  // filename: '[name]-[hash].bundle.css',
  filename: '[name].bundle.css?ver=[chunkhash]',
  allChunks: true,
  disable: false,
  publicPath,
});

const HtmlWebpackPluginConfig = {
  // // spa fallback (prod, ie github pages only): ¯\_(ツ)_/¯,
  // filename: 'index.html',
  favicon: './src/assets/favicon.ico',
  template: './src/assets/index.html',
  minify: {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  },
};

const htmlWebpackPlugin = env => {
  if (env !== 'prod') {
    HtmlWebpackPluginConfig.minify = false;
  }
  return new HtmlWebpackPlugin(HtmlWebpackPluginConfig);
};

export default env => [
  new NoErrorsPlugin(),
  extractTextWebpackPlugin,
  new optimize.CommonsChunkPlugin({
    name: 'vendors',
    minChunks: Infinity,
    // filename: 'vendors.bundle.js',
    // // // filename: 'vendors-[hash].bundle.js',
    filename: '[name].bundle.js?ver=[chunkhash]',
  }),
  new ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
  }),
  htmlWebpackPlugin(env),
  new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'defer', }),
  // // not necessary:
  // new DefinePlugin({
  //   'process.env': {
  //     'NODE_ENV': JSON.stringify(env),
  //   },
  // }),
];
