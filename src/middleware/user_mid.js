var mysql = require('mysql');
var config = require('../../config');
var user_model = require('../models/user_model');
var db = require('../database/db_pool');

function User(){
  //Determines whether a user exists,
  this.exist = function(obj, callback){
    db.getConnection(function(err, connection) {
      try{
        if (err) {throw err;}
        // Use the connection
        if (obj.username !== undefined){
          var sql = `SELECT ??,??,??,??,??,??,?? FROM ${config.db.database}.users where username = ?`;
          var inserts = ['users_id','fName','lName','pass_hash','salt','email','permissions_fk', obj.username];
          sql = mysql.format(sql, inserts);
        }else if (obj.username !== undefined){
          var sql = `SELECT ??,??,??,??,??,?? FROM ${config.db.database}.users where email = ?`;
          var inserts = ['users_id','fName','lName','pass_hash','salt','email','permissions_fk', obj.email];
          sql = mysql.format(sql, inserts);
        }else{
          throw new Error('No id or username provided');
        }

        connection.query(sql, function(err, rows) {
          try{
            if (err) {throw err;}
            var user = rows[0];
            if (user == undefined) {throw new Error('No row data');}
            //var new_user = new user_model({user});
            //self.data = rows;
            callback('', user); // All values have been set
            connection.release();
          }catch (err){
            //Create new object attib if no data is found

            console.log(err);
            connection.release();
            callback(err, {});
          }
        });
      }catch(err){
          console.log(err);
      }
    });
  }
}

module.exports = new User();

//
