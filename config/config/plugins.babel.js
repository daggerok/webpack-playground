import { resolve } from 'path';
import {
  optimize,
  DefinePlugin,
  ProvidePlugin,
  LoaderOptionsPlugin,
  NoEmitOnErrorsPlugin, } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import { publicPath } from './output.babel.js';
import precss from 'precss';
import rucksack from 'rucksack-css';

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

/* helpers */
const is = (env, test) => env === test || (env && env[test]);
const not = (env, test) => !is(env, test);

const htmlWebpackPlugin = env => {
  if (not(env, 'prod')) {
    HtmlWebpackPluginConfig.minify = false;
  }
  return new HtmlWebpackPlugin(HtmlWebpackPluginConfig);
};

const AUTOPREFIXER_BROWSERS = [
  'last 4 versions',
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 28',
  'Explorer >= 9',
  'ie >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

const productionPlugins = env => env !== 'prod' ? [] : [
  // production death code (using in libs like react...);
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  // minification:
  new optimize.UglifyJsPlugin({
    mangle: { keep_fnames: true, },
    compress: { warnings: false, },
    sourceMap: not(env, 'prod'),
  }),
];

export const extractTextWebpackPlugin = new ExtractTextWebpackPlugin({
  // filename: '[name]-[hash].bundle.css?ver=[chunkhash]',
  filename: '[name].bundle.css?ver=[chunkhash]',
  allChunks: true,
  disable: false,
  publicPath,
});

export default env => [
  new NoEmitOnErrorsPlugin(),
  // apply any optimizations for loaders they can do to speed up build time with no debugging
  // fix webpack2 + extract-text-webpack-plugin issue postcss config file not found, or:
  // https://github.com/webpack/webpack/issues/3018#issuecomment-248633498
  new LoaderOptionsPlugin({
    options: {
      context: resolve('.'),
      babel: {
        presets: [
          'es2015',
          'stage-0',
          'react',
        ],
        plugins: [
          'transform-class-properties',
          'syntax-dynamic-import',
          'react-html-attrs',
        ],
      },
      postcss: [
        precss,
        rucksack({
          fallbacks: true,
          autoprefixer: {
            browsers: AUTOPREFIXER_BROWSERS,
          },
        }),
      ],
    },
    minimize: is(env, 'prod'),
    debug: not(env, 'prod'),
  }),
  extractTextWebpackPlugin,
  is(env, 'test') ? undefined : new optimize.CommonsChunkPlugin({ // will not used for test
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
].filter(plugin => !!plugin); // do not include any undefined into array!
