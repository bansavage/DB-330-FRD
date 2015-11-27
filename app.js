/*
  Start Web Server Here and take in command line arguments, sets up the database
*/

//Notes: Make sure the config file has the correct data or a Knex error will
// be displayed.

"use strict"
var config = require('./config');
var User = require('./src/models/user_model.js');
var search_mid = require('./src/middleware/search_mid')
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var ejs = require('ejs');
var app = express();

//Redefine where views are located
app.set('views',`${__dirname}/src/views/html`);
//Sets the view engine, it will render html as ejs
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
//varriable to keep track of compiled html
//var html = {value : {}};
//Compiles the jade templates in the view
//app.use('/public/views', function(){
  //var options = {cache: true};
  //jade.compileFile('/public/views/index.jade', options);
  //jade.renderFile('/public/views/index.jade');
//});
//Hosts the static files in public under /assets
app.use('/assets', express.static(`${__dirname}/src/views/assets`));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// route middleware to verify a token
var verify = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status('401').json({ success: false, message: 'Not a token' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        console.log(req.decoded);
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(401).render('login',{
       message: 'login successful'
     });
  }
};

//Middleware
//Checks token if valid (experation) and user exists, gives back user data
var authorize = function(req, res, next) {
  if (req.decoded){
    //verify if auth is correct go to controlpanel
    if (decode.userId){

    }else{
      return res.status(401).render('login',{
         message: 'Token invalid'
       });
    }
  }
};

//Default route gives back login page
app.get('/', function(req, res){
  //if no successful auth token
  res.render('login',{
     message: 'login successful'
   });
});

//Login page route
app.get('/login', function(req, res){
  //if no successful auth token

  res.render('login',{
     message: 'login successful'
   });
});

//app.use('/')
app.get('/controlpanel', verify, function(req, res){

  var data = {};

  res.render('controlpanel', data);
});


//searching, Expects an array of values EX: test?array=a&array=b&array=c
app.get('/search/:keywords', function(req, res, next){
  var values = req.query.array;
  //search_min.getPapers(req.params);
  console.log(values);
  search_mid.getPapers(values, function(arr){
    //Render Page with data from the arr
    //res.json({data: arr});
    res.render();
  });

  if (req.params === Array){
    console.log(true);
  }
});



app.get('/api/users/:id', function(req, res){
  var newUser = user_model(req.params.id);

  //console.log(newUser.fetchProps("my err", function(rows){
  //  console.log(rows);
  //}));
  //console.log("worked");
});



app.post('/api/authenticate', function(req, res){

  //Search for user


  //req.body.name
  //req.body.password -> should be hashed

  //If user doesn't exist
    //res.json({ success: false, message:'Authentication failed.'});

  //Check if password matches

  //If the user is found and password is correct
    var token = jwt.sign({userId: 'fake'}, config.secret, {
      expiresInMinutes: 1440 // 24 hours
    });

    res.json({
       success: true,
       message: 'Authentication successful',
       token: token
     });

});




app.listen(config.server.port);
console.log(`app running`);
