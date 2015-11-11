var mysql = require('mysql');
var user_model = require('./user_model');
var db = require('../database/db_pool');

function User(){
  //Determines whether a user exists,
  this.exist = function(obj, callback){
    db.getConnection(function(err, connection) {
    try{
      if (err) {throw err;}
      // Use the connection
      if (obj.id !== undefined){
        var sql = "SELECT ??,??,??,?? FROM frd.users where p_id = ?";
        var inserts = ['f_name','l_name','pass','email', self.data.p_id];
        sql = mysql.format(sql, inserts);
      }else if (obj.username !== undefined){
        var sql = "SELECT ??,??,??,?? FROM frd.users where email = ?";
        var inserts = ['p_id','f_name','l_name','pass', obj.username;
        sql = mysql.format(sql, inserts);
      }else{
        throw new Error('No id or username provided');
      }

      connection.query(sql, function(err, rows) {
        try{
          if (err) {throw err;}
          if (rows[0] == undefined) {throw new Error('No row data');}
          var new_user = new user_model({row[0]});
          //self.data = rows;
          callback(new_user); // All values have been set
          connection.release();
        }catch (err){
          //Create new object attib if no data is found
          console.log(err);
          connection.release();
        }
      }
    }catch(err){
        console.log(`${err}`);
    }
    }
  }
}

module.exports = new User();
