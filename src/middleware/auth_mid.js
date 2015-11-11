var middleware = require('./middleware.js');
var jwt = require('jwt-simple');
var moment = require('moment');

/*
  Incharge of handeling user interaction within the web app.
*/

var expires = moment().add('days', 7).valueOf();
var token = jwt.encode({
  iss: user.id,
  exp: expires
}, app.get('jwtTokenSecret'));

res.json({
  token : token,
  expires: expires,
  user: user.toJSON()
});
