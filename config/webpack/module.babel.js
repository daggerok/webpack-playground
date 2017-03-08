import { publicPath } from './output.babel';
import { extractTextWebpackPlugin } from './plugins.babel';
import { pathTo } from './resolve.babel';

const use = [
  {
    loader: 'css-loader',
    options: {
      importloader: 1,
      minimize: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: 'inline',
    },
  },
];

const cssLoader = extractTextWebpackPlugin.extract({
  publicPath,
  fallbackLoader: 'style-loader',
  // loader: 'css-loader?importloader=1!postcss-loader?sourceMap=inline!stylus-loader',
  use,
});

const stylusLoader = extractTextWebpackPlugin.extract({
  publicPath,
  fallbackLoader: 'style-loader',
  use: [
    ...use,
    'stylus-loader',
  ],
});

export default {
  rules: [
    {
      test: /\.jsx?$/i,
      loader: 'babel-loader',
      options: {
        presets: [
          // [ 'es2015', { modules: 'commonjs' } ], // can be false or amd, umd, systemjs, commonjs
          [ 'es2015', { modules: false } ],
          'stage-0',
          'react',
        ],
        plugins: [
          'transform-class-properties',
          'syntax-dynamic-import',
          'react-html-attrs',
        ],
      },
      include: pathTo('./src'),
    },
    {
      test: /\.css$/i,
      loader: cssLoader,
    },
    {
      test: /\.styl$/i,
      loader: stylusLoader,
      include: pathTo('./src'),
    },
  ],
};
