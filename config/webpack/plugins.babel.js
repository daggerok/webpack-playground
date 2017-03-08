import {
  optimize,
  DefinePlugin,
  ProvidePlugin,
  LoaderOptionsPlugin,
  NoEmitOnErrorsPlugin, } from 'webpack';
import precss from 'precss';
import rucksack from 'rucksack-css';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import { publicPath } from './output.babel.js';
import { pathTo } from './resolve.babel';

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
  }),
];

export default env => [
  new NoEmitOnErrorsPlugin(),
  extractTextWebpackPlugin,
  new optimize.CommonsChunkPlugin({ name: 'manifest', }),
  new optimize.CommonsChunkPlugin({
    name: 'vendors',
    chunks: [
      'app',
      'vendors',
    ],
  }),
  new ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
  }),
  htmlWebpackPlugin(env),
  new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'defer', }),
  ...productionPlugins(env),
  // apply any optimizations for loaders they can do to speed up build time with no debugging
  // fix webpack2 + extract-text-webpack-plugin issue postcss config file not found, or:
  // https://github.com/webpack/webpack/issues/3018#issuecomment-248633498
  new LoaderOptionsPlugin({
    options: {
      context: pathTo('.'),
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
            browsers: [
              'last 4 versions',
            ],
          },
        }),
      ],
    },
    minimize: env === 'prod',
    debug: env !== 'prod',
  }),
];
