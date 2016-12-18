import {
  optimize,
  DefinePlugin,
  ProvidePlugin,
  NoErrorsPlugin,
  LoaderOptionsPlugin, } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import { publicPath } from './output.babel.js';

export const extractTextWebpackPlugin = new ExtractTextWebpackPlugin({
  // filename: '[name]-[hash].bundle.css?ver=[chunkhash]',
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

/*
  Warniing! do not use `-p` webpack build option with it!
  if you want compage -p with this solution:
  - comment out `...productionPlugins(env),` line
  - run build with command: `npm run build -- -p`

  read more here:
  https://webpack.js.org/guides/production-build/#components/sidebar/sidebar.jsx
*/
const productionPlugins = env => env !== 'prod' ? [] : [
  // production death code (using in libs like react...);
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  // minification:
  new optimize.UglifyJsPlugin({
    compress:{
      warnings: false,
    },
  }),
  // apply any optimizations for loaders they can do to speed up build time with no debugging
  new LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
];

export default env => [
  new NoErrorsPlugin(),
  extractTextWebpackPlugin,
  new optimize.CommonsChunkPlugin({
    name: 'vendors',
    minChunks: Infinity,
    // filename: 'vendors-[hash].bundle.js?ver=[chunkhash]',
    filename: '[name].bundle.js?ver=[chunkhash]', // vendors.bundle.js
  }),
  new ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
  }),
  htmlWebpackPlugin(env),
  new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'defer', }),
  ...productionPlugins(env),
];
