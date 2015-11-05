/*
  Start Web Server Here and take in command line arguments, sets up the database
*/

//Notes: Make sure the config file has the correct data or a Knex error will
// be displayed.


var Model = require('./src/models/model');

"use strict"
var config = require('./config');
var express = require('express');
var jade = require('jade');

var app = express();

//Redefine where views are located
app.set('views',`${__dirname}/public/views`);
//Sets the view engine
app.set('view engine', 'jade');
//varriable to keep track of compiled html
var html = {value : {}};
//Compiles the jade templates in the view
app.use('/public/views', function(){
  var options = {cache: true};
  jade.compileFile('/public/views/index.jade', options);
  jade.renderFile('/public/views/index.jade');
});
//Hosts the static files in public under /assets
app.use('/assets', express.static(`${__dirname}/public`));


app.get('/', function(req, res){
  res.render('index',{
     title : 'Home',
     username: 'lance'
   }
  );
});


var mod = Model();
// mod.id_tracker.setup();
// console.log(mod.id_tracker);
// console.log(mod.id_tracker.value[0]);

app.listen(config.server.port);
console.log(`app running`);
