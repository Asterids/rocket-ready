const path = require('path');

module.exports = {
  entry: './public/index.html',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
