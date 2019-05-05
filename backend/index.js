const express = require('express');
var createError = require('http-errors');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/api');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// route for all api routes
app.use('/api', api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(5000, () => console.log('Gator app listening on port 5000!'));