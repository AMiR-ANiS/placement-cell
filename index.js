const express = require('express');
const app = express();
const viewHelpers = require('./config/view-helpers');
const env = require('./config/environment');
const path = require('path');
const port = env.port;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleWare = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleWare = require('./config/middleware');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

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
if (env.name === 'development') {
  app.use(
    sassMiddleWare({
      src: path.join(__dirname, env.asset_path, 'scss'),
      dest: path.join(__dirname, env.asset_path, 'css'),
      debug: true,
      outputStyle: 'expanded',
      prefix: '/css'
    })
  );
}
app.use(express.static(path.join(__dirname, env.asset_path)));
app.use(expressLayouts);
app.use(
  session({
    name: env.session_cookie_name,
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60
    },
    store: MongoStore.create({
      mongoUrl: `mongodb://localhost/${env.db_name}`,
      autoRemove: 'disabled'
    })
  })
);
app.use(flash());
app.use(customMiddleWare.setFlash);
app.use('/', require('./routes'));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  } else {
    console.log(`Server is up and running on port: ${port}`);
  }
});
