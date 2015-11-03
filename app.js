/*
  Start Web Server Here and take in command line arguments, sets up the database
*/
var config = require('./config');
var express = require('express');
app = express();

app.use('/assets', express.static(`${__dirname}/public`))


app.set('view engine', '')

app.get('/', function(req, res){
  res.send(`<html><body>HelloWorld</body></html>`);
});

app.get('/profile/:id', function(req, res){
  res.send(`<html><body>${req.params.id}</body></html>`);
});

app.listen(config.server.port);
