import {
  optimize,
  DefinePlugin,
  ProvidePlugin,
  LoaderOptionsPlugin,
  NoEmitOnErrorsPlugin, } from 'webpack';
import precss from 'precss';
import rucksackCss from 'rucksack-css';
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

export default env => [
  new NoEmitOnErrorsPlugin(),
  extractTextWebpackPlugin,
  env !== 'test' ? new optimize.CommonsChunkPlugin({ // skip for test
    name: 'manifest',
  }) : undefined,
  env !== 'test' ? new optimize.CommonsChunkPlugin({ // skip for test
    name: 'vendors',
    chunks: [
      'app',
      'vendors',
    ],
  }) : undefined,
  new ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
  }),
  new HtmlWebpackPlugin({
    // // spa fallback (prod, ie github pages only): ¯\_(ツ)_/¯,
    // filename: 'index.html',
    chunks: 'all',
    favicon: './src/assets/favicon.ico',
    template: './src/assets/index.html',
    minify: env !== 'prod' ? false : {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    },
  }),
  new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'defer', }),
  // production death code (using in libs like react...);
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env === 'prod' ? 'production' : 'development'),
    },
  }),
  // minification:
  env === 'prod' ? new optimize.UglifyJsPlugin({
    mangle: { keep_fnames: true, },
    compress: { warnings: false, },
    sourceMap: env !== 'prod',
  }) : undefined,
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
        rucksackCss({
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
].filter(plugin => !!plugin); // do not include any undefined into array!
