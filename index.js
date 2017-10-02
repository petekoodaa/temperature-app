const path = require('path');
var express = require('express');
var app = express();

app.use('/static', express.static(path.join(__dirname, '/public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

var temperature = require('./routes/temperature.js');
app.use('/temperature', temperature);

app.listen(3000, function() {
  console.log("We have started our server on port 3000");
});

app.get('/', function(req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

