var middleware = require('./middleware.js');
/*
  Handles requests to get information such as key-wrods, abstracts,
  searching of any kind, etc ...
*/
var User = require('../models/user_model_rest');

//Get user profile page with papers they have authored

User.exist({ username: username }, function(err, user) {
  if (err) {
    // user not found
    return res.send(401);
  }

  if (!user) {
    // incorrect username
    return res.send(401);
  }

  if (!user.validPassword(password)) {
    // incorrect password
    return res.send(401);
  }

  // User has authenticated OK
  res.send(200);
});

//
