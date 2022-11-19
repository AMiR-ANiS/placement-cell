require('dotenv').config();
const express = require('express');
const app = express();
const viewHelpers = require('./config/view-helpers');
// const env = require('./config/environment');
const path = require('path');
const port = parseInt(process.env.PLCMNT_PORT);
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleWare = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleWare = require('./config/middleware');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const logger = require('morgan');
const loggerConfig = require('./config/logger');

viewHelpers(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
if (process.env.PLCMNT_NAME === 'development') {
  app.use(
    sassMiddleWare({
      src: path.join(__dirname, 'assets', 'scss'),
      dest: path.join(__dirname, 'assets', 'css'),
      debug: true,
      outputStyle: 'expanded',
      prefix: '/css'
    })
  );
}
app.use(express.static(path.join(__dirname, process.env.PLCMNT_ASSET_PATH)));
app.use(expressLayouts);
app.use(
  session({
    name: process.env.PLCMNT_SESSION_COOKIE_NAME,
    secret: process.env.PLCMNT_SESSION_COOKIE_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60
    },
    store: MongoStore.create({
      mongoUrl: `mongodb://localhost/${process.env.PLCMNT_DB_NAME}`,
      autoRemove: 'disabled'
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
app.use(flash());
app.use(customMiddleWare.setFlash);
app.use(logger(loggerConfig.mode, loggerConfig.options));
app.use('/', require('./routes'));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  } else {
    console.log(`Server is up and running on port: ${port}`);
  }
});
