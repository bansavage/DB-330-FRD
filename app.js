/*
  Start Web Server Here and take in command line arguments, sets up the database
*/

//Notes: Make sure the config file has the correct data or a Knex error will
// be displayed.

"use strict"
var config = require('./config');
var User = require('./src/models/user_model.js');
var search_mid = require('./src/middleware/search_mid');
var user_mid = require('./src/middleware/user_mid');
var paper_mid = require('./src/middleware/paper_mid');
var express = require('express');
var _ = require('lodash');
var crypto = require('crypto');
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

//Middleware
// Checks if token exist on input,
//Checks token if valid (experation) and user exists, goes next
var authorize = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret, algorithms used, and checks experation time
    jwt.verify(token, config.secret, { algorithms: ['HS256']}, function(err, decoded) {
      if (err) {
        console.log(err);
        res.redirect('login');
        return;
      } else {
        req.body.userId = decoded.userId;
        req.body.permission = decoded.permission;
        next();
      }
    });

  } else {
    // if there is no token
    res.redirect('login');
     return;
  }
};

//Default route gives back login page
app.get('/', function(req, res){
  //if no successful auth token
  res.render('login',{
     message: 'login successful',
     success: true
   });
});

//Brings the user to the login page
app.get('/login', function(req, res){
  res.render('login',{});
});

//Renders the delete papers page
app.get('/papers/delete', authorize, function(req, res){
  res.render('delete');
});

//Middleware for deleting papers
app.use('/api/papers/delete', authorize);
app.use('/api/papers/delete', paper_mid.hasPermission);
//Delete a paper, requires the proper premissions to do so.
// The request just needs an object with a papers_id inside, as well as a jwt token.
app.post('/api/papers/delete', function(req, res){
  res.send('worked');
});

//Middleware for editing papers
app.use('/api/papers/delete', authorize);
app.use('/api/papers/delete', paper_mid.hasPermission);
// Edits a paper, requires a paper object with the updated parameters
// The request just needs an object with a papers_id inside, as well as a jwt token.
app.get('/papers/edit', function(req, res){
  res.render('edit');
});

//Renders the create papers page
app.get('/papers/create', function(req, res){
  res.render('add');
});

//Create a paper, requires paper object data specified below, and jwt token
// {
//   title,
//   abstract,
//   citation
// }
app.post('/api/papers/create', authorize, function(req, res){
  var paperData = req.body;
  paperData.users_id = req.body.userId;

  paper_mid.createPaper(paperData, function(err, message){
  if (err){
      console.log(err);
      res.status(401).send({message : 'Paper Creation Failed'});
  }else{
    res.status(200).send({message : 'Paper Creation Successful'});
  }
  });
});


//Renders the mypapers page
app.get('/papers', function(req, res){
  res.render('mypapers');
});

//app.use('/') authorize middleware is working
app.get('/controlpanel', authorize, function(req, res){
  var data = {
    userId : req.body.userId
  };
  res.render('controlpanel', data);
});

app.get('/search', function(req, res){
  res.render('search', {
    papers: []
  });
});


//searching, Expects an array of values EX: test?array=a&array=b&array=c
//Returns and array of objects example object: {
  // title -> String
  // authors -> array of strings
  // abstract -> String
  // citations -> String
  // paper_keywords -> array of strings
//}
app.get('/search/:keywords', function(req, res, next){
  var keywords = req.query.keywords;

  if (!keywords){
    res.json({
     papers : []
   });
  }else{
    search_mid.getPapers({keywords : keywords}, function(err, papers){
        if (err || !papers){
          console.log(err);
          res.status(401).send({message: 'Invalid Request'});
        }else{
          //Gets keywords
          papers.forEach(function(paper, index, arr){
            paper_mid.getKeywords(paper, function(err, keywords){
              if (err){
                console.log(err);
                res.status(401).send({message: 'Paper Authors Error'});
              }else{

                if (index >= arr.length-1){
                  paper.keywords = _.uniq(keywords);
                  // Gets authors
                  papers.forEach(function(paper2, index2, arr2){
                    paper_mid.getAuthors(paper2, function(err, keywords){
                      if (err){
                        console.log(err);
                        res.status(401).send({message: 'Paper Keywords Error'});
                      }else{
                        if (index2 >= arr2.length-1){
                          res.render('search',{
                           papers : papers
                          });
                        }else{
                          index2 += 1;
                        }
                      }
                    });
                  });
              }else{
                index += 1;
              }

            }
            });
          });
        };
      });
    }

  if (req.params === Array){
    console.log(true);
  }
});


app.get('/api/search/:keywords', function(req, res, next){
  var keywords = req.query.keywords;

  if (!keywords){
    res.json({
     papers : []
   });
  }else{
    search_mid.getPapers({keywords : keywords}, function(err, papers){
        if (err || !papers){
          console.log(err);
          res.status(401).send({message: 'Invalid Request'});
        }else{
          //Gets keywords
          papers.forEach(function(paper, index, arr){
            paper_mid.getKeywords(paper, function(err, keywords){
              if (err){
                console.log(err);
                res.status(401).send({message: 'Paper Authors Error'});
              }else{
                paper.keywords = _.uniq(keywords);
                if (index >= arr.length-1){

                  // Gets authors
                  papers.forEach(function(paper2, index2, arr2){
                    paper_mid.getAuthors(paper2, function(err, authors){
                      if (err){
                        console.log(err);
                        res.status(401).send({message: 'Paper Keywords Error'});
                      }else{
                        paper2.authors = authors;
                        if (index2 >= arr2.length-1){
                          res.json({
                           papers : papers
                          });
                        }else{
                          index2 += 1;
                        }
                      }
                    });
                  });
              }else{
                index += 1;
              }

            }
            });
          });
        };
      });
    }

  if (req.params === Array){
    console.log(true);
  }
});

// Get the user based on the user id in the jwt token
app.get('/api/users/', authorize, function(req, res){
  user_mid.exist({users_id : req.body.userId}, function(err, user){
    if (err){
      console.log(err);
      res.status(401).send({message: 'User does not exist'});
    }else{
      delete user['salt'];
      delete user['pass_hash'];
      res.json(user);
    }
  });
});

//This provides the paper information based on the user id in the jwt token.
//Give back all papers associated with the given user
app.get('/api/papers/', authorize, function(req, res){

  user_mid.getPapers({users_id : req.body.userId}, function(err, papers){
    if (err){
      console.log(err);
      res.status(401).send({message: 'Invalid Request'});
    }else{

      papers.forEach(function(paper, index, arr){
        paper_mid.getKeywords(paper, function(err, keywords){
          if (err){
            console.log(err);
            res.status(401).send({message: 'Paper Keywords Error'});
          }else{
            paper.keywords = keywords;
            if (index >= arr.length-1){
              res.json({
               papers : papers
             });
            }else{
              index += 1;
            }
          }
        });
      });

    };
  });
});


app.delete('/api/papers/:id', function(req, res){
  //Use paper mid
});

//This will varify if a username and password provided are valid
//If the they both are valid it will return a jwt token in the body response
//else it will return a 401
app.post('/api/authenticate', function(req, res){

  var username = req.body.username;
  var password = req.body.password;

  if (!username){
    //throw new Error('No Username Found')
    res.status(401).send({message: 'No Username Found'});
  }else if (!password){
    //throw new Error('No Password Found');
    res.status(401).send({message: 'No Password Found'});
  }else{


    //Search for user
    user_mid.exist({ username: username }, function(err, user) {
      if (err) {
        // user not found
        console.log(err);
        res.status(404).send({message: 'User Not Found'});
        return;
      }

      if (!user) {
        // incorrect user credentials
        res.status(401).send({message: 'No user found'});
        return;
      }

      if (!user.pass_hash || !user.salt){
        res.status(401).send({message: 'User password or salt error'});
        return;
      }

      if (!user.users_id){
        res.status(401).send({message: 'User ID does not exist'});
        return;
      }
      // User has authenticated OK
      // Generate password hash with user's salt(32bit)
      var hash = crypto
      .createHash("sha256")
      .update(password+user.salt)
      .digest('hex');

      console.log(`hash: ${hash}`);
      console.log(`user pass: ${user.pass_hash}`);

      if (hash === user.pass_hash){

        //Create JWT Token
        var token = jwt.sign({userId: user.users_id, permission: user.permission}, config.secret, {algorithm: 'HS256'}, {
          expiresIn: 43200 // 24 hours
        });

        res.setHeader("x-access-token", token);
        res.json({
           success: true,
           user_id: user.users_id,
           message: 'Authentication successful',
           token: token
         });
      }else{
        res.status(401).send({message: 'Username or password is incorrect'});
      }
    });
  }
});




app.listen(config.server.port);
console.log(`app running`);
