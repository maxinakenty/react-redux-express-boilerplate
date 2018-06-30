const { join } = require('path');

const PORT = process.env.PORT || 3000;

const PATH = {
  publicFolder: join(__dirname, '..', 'client', 'public'),
  sourceFolder: join(__dirname, '..', 'client', 'src'),
  htmlFile: join(__dirname, '..', 'client', 'public', 'index.html'),
};

module.exports = {
  PATH,
  PORT,
};
