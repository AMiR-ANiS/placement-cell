const express = require('express');
const app = express();
const env = require('./config/environment');
const path = require('path');
const port = env.port;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleWare = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleWare = require('./config/middleware');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, env.asset_path)));
if (env.name === 'development') {
  app.use(
    sassMiddleWare({
      src: path.join(__dirname, env.asset_path, 'scss'),
      dest: path.join(__dirname, env.asset_path, 'css'),
      debug: false,
      outputStyle: 'expanded',
      prefix: '/css'
    })
  );
}
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
// app.use(flash());
// app.use(customMiddleWare.setFlash);
// flash requires session

app.listen(port, (err) => {
  if (err) {
    console.log(`error in running the server: ${err}`);
  } else {
    console.log(`server is up and running on port: ${port}`);
  }
});
