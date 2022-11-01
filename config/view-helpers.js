const env = require('./environment');

module.exports = (app) => {
  app.locals.assetPath = (filePath) => {
    if (env.name === 'development') {
      return filePath;
    }
  };
};
