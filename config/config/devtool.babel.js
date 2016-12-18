// const devtool = (env) => env && env.prod ? false : 'eval';

export default (env) => env && env === 'prod' ? 'source-map' : 'eval';
