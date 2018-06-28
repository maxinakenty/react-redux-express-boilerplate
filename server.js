const { join } = require('path');
const express = require('express');

const app = express();
const router = express.Router();
const webpack = require('webpack');
const bodyParser = require('body-parser');
const logger = require('morgan');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const { IS_DEVELOPMENT } = require('./tools/constants');

const PORT = process.env.PORT || 3000;
const PATH = {
  publicFolder: join(__dirname, 'public'),
  sourceFolder: join(__dirname, 'src'),
  htmlFile: join(__dirname, 'public', 'index.html'),
};

// middleware
app
  .use(router)
  .use(logger('dev'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(PATH.publicFolder));

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

  router.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(PATH.htmlFile));
    res.end();
  });
}

router.get('*', (req, res) => {
  res.sendFile(PATH.htmlFile);
});

app.listen(PORT);
