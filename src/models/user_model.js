var mysql = require('');
var db = require('../database/db_pool');

function user_model(id){
  return {
    //No need for Getters and Setters
    p_id: id;
    f_name: "";
    l_name: "";
    pass = "";
    email = "";

    //Updates the properties in the database
    //Takes an err and an array of properties to update
    //We never need to create a property because default values are used
    //For the properties not initially set
    updateProps: function(err, props){
      //Example Connection
      db.getConnection(function(err, connection) {
        if (err) {throw err;}
        // Use the connection
        connection.query( 'SELECT * FROM frd.users', function(err, rows) {
          if (err) {throw err;}
          // And done with the connection.
          connection.release();
          // Don't use the connection here, it has been returned to the pool.
        });
      });
      //If something bad happens add a string to err
      //Example: err = "update could not finish"
    };

    //Deletes the properties
    //Takes an err and an array of properties to delete
    deleteProps: function(err, props){
      //Example Connection
      pool.getConnection(function(err, connection) {
        if (err) {throw err;}
        // Use the connection
        connection.query( 'SELECT * FROM frd.users', function(err, rows) {
          if (err) {throw err;}
          // And done with the connection.
          connection.release();
          // Don't use the connection here, it has been returned to the pool.
        });
      });
      //If something bad happens add a string to err
      //Example: err = "update could not finish"
    };

    //Fetches all properties from the database using p_id
    fetchProps: function(err){
      //Example Connection
      pool.getConnection(function(err, connection) {
        if (err) {throw err;}
        // Use the connection
        var sql = "SELECT * FROM frd.users where p_id = ?";
        var inserts = [p_id];
        sql = mysql.format(sql, inserts);

        connection.query(sql, function(err, rows) {
          if (err) {throw err;}
          // And done with the connection.

          //Set Rows Here

          connection.release();
          // Don't use the connection here, it has been returned to the pool.
        });
      });
      //If something bad happens add a string to err
      //Example: err = "update could not finish"
    };

  };
};

//Constructor with more parameters
function user_model(id, f_name, l_name, pass ,email){
  var um = user_model(id);
  um.f_name = f_name;
  um.pass = pass;
  um.l_name = l_name;
  um.email = email;
  return um;
}

module.exports = user_model;
