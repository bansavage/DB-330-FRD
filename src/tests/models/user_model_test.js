/*
  Start Web Server Here and take in command line arguments, sets up the database
*/

//Notes: Make sure the config file has the correct data or a Knex error will
// be displayed.

"use strict"
var User = require('../../models/user_model.js');


var user = new User({p_id: '1'});
user.fetchProps('myError', function(){
  console.log('here'); // Setting of fetch completed
  console.log(`user data pid: ${user.data.p_id}`);
  console.log(`user data f_name: ${user.data.f_name}`);
  console.log(`user data l_name: ${user.data.l_name}`);
  console.log(`user data pass: ${user.data.pass}`);
  console.log(`user data email: ${user.data.email}`);
});
