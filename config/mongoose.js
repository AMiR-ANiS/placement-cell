// mongoose config file

const mongoose = require('mongoose');
// const env = require('./environment');

// get variables for database user and password from config vars
const db_user = encodeURIComponent(process.env.PLCMNT_DB_USER);
const db_password = encodeURIComponent(process.env.PLCMNT_DB_PASSWORD);

// mongodb atlas URI
const uri = `mongodb+srv://${db_user}:${db_password}@cluster0.q2wqs6f.mongodb.net/?retryWrites=true&w=majority`;

// connect to database
mongoose.connect(uri);

// get connection instance
const db = mongoose.connection;

// check for connection errors
db.on('error', console.error.bind(console, 'Error connecting to Database!'));

// once database is connected, log message
db.once('open', () => {
  console.log('Connected to Database!');
});

module.exports = {
  db,
  uri
};
