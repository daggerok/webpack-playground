import { resolve } from 'path';

export default {
  modules: [
    'node_modules',
    resolve('./src'),
  ],
  extensions: [
    '.js',
    '.styl',
  ],
};
