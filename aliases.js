const path = require('path');

module.exports = {
  '@root': path.resolve(__dirname),
  '@models': path.resolve(__dirname, 'models'),
  '@controllers': path.resolve(__dirname, 'controllers'),
  '@validators': path.resolve(__dirname, 'validators')
};