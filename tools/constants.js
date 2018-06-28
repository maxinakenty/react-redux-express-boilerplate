const { join } = require('path');

const IS_DEVELOPMENT =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const CSS_MODULES_HASH = '[local]__[hash:base64:8]';

const PATH = {
  src: join(__dirname, '..', 'src'),
  postcssConfig: join(__dirname, 'postcss.config.js'),
  public: join(__dirname, '..', 'public'),
};

module.exports = {
  IS_DEVELOPMENT,
  PATH,
  CSS_MODULES_HASH,
};
