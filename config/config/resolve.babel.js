import path from 'path';

export default {
  modules: [
    'node_modules',
    path.resolve('./src'),
  ],
  extensions: [
    '.js',
    '.styl',
  ],
};
