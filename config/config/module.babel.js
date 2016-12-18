import { resolve } from 'path';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import { publicPath } from './output.babel';
import { extractTextWebpackPlugin } from './plugins.babel';

const AUTOPREFIXER_BROWSERS = [
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

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    importloader: 1,
  }
};

const loaders = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: true,
      importloader: 1,
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        // autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }),
        autoprefixer({ browsers: 'last 3 version', }),
        // autoprefixer,
        cssnano,
      ],
    },
  },
  {
    loader: 'stylus-loader',
    options: {
      includePaths: [
        resolve('./src'),
      ],
    },
  },
];

const loader = extractTextWebpackPlugin.extract({
  publicPath,
  fallbackLoader: 'style-loader',
  notExtractLoader: 'style-loader',
  loader: 'css-loader?importloader=1!postcss-loader?sourceMap=inline!stylus-loader',
});

export default {
  rules: [
    {
      test: /\.js$/i,
      loader: 'babel-loader',
      // query: {
      //   presets: [
      //     ['es2015', { 'modules': false }],
      //     'stage-0',
      //     'react',
      //   ],
      // },
      include: resolve('./src'),
      exclude: /(node_modules|bower_components)/,
    },
    {
      test: /\.(styl|css)$/i,
      loader,
      // loaders,
      // use: loaders,
      include: resolve('./src'),
      exclude: /(node_modules|bower_components)/,
    },
    {
      test: /\.css$/i,
      loader,
      include: /(node_modules|bower_components)/,
    },
  ],
};
