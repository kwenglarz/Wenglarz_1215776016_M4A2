const express = require('express');
const morgan = require('morgan');
const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'))
}

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});

// 3) ROUTES
const loanRoute = require('./routes/loanRoutes');
app.use('/loans', loanRoute);

module.exports = app;