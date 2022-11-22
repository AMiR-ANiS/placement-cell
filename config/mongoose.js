const mongoose = require('mongoose');
// const env = require('./environment');

const db_user = encodeURIComponent(process.env.PLCMNT_DB_USER);
const db_password = encodeURIComponent(process.env.PLCMNT_DB_PASSWORD);
const uri = `mongodb+srv://${db_user}:${db_password}@cluster0.q2wqs6f.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to Database!'));
db.once('open', () => {
  console.log('Connected to Database!');
});

module.exports = {
  db,
  uri
};
