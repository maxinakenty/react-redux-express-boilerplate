const express = require('express');

const app = express();
const webpack = require('webpack');
const bodyParser = require('body-parser');
const logger = require('morgan');
const compression = require('compression');
const history = require('connect-history-api-fallback');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const { IS_DEVELOPMENT } = require('../tools/constants');
const { PATH, PORT } = require('./constants');

// middleware
app
  .use(logger('dev'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(PATH.publicFolder))
  .use(compression())
  .use(history());

if (IS_DEVELOPMENT) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: PATH.sourceFolder,
    noInfo: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: true,
      modules: true,
    },
  });

  app.use(middleware).use(webpackHotMiddleware(compiler));

  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(PATH.htmlFile));
    res.end();
  });
}

app.get('*', (req, res) => {
  res.sendfile(PATH.htmlFile);
});

app.listen(PORT);
