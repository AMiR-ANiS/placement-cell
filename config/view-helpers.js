// view helpers config for static assets
// set the appropriate path for assets based on whether app is in development mode or production mode

// const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  app.locals.assetPath = (filePath) => {
    if (process.env.PLCMNT_NAME === 'development') {
      return '/' + filePath;
    } else if (process.env.PLCMNT_NAME === 'production') {
      return (
        '/' +
        JSON.parse(
          fs.readFileSync(
            path.join(__dirname, '..', 'public', 'assets', 'rev-manifest.json')
          )
        )[filePath]
      );
    }
  };
};
