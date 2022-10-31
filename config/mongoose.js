const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db_name}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to Database!'));
db.once('open', () => {
  console.log('Connected to Database!');
});

module.exports = db;
