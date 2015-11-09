var mysql = require('mysql');
var db = require('../database/db_pool');

function user_model(id){
  return {
    //No need for Getters and Setters
    p_id: id,
    f_name: "",
    l_name: "",
    pass : "",
    email : "",
    self : this,
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
    },

    //Deletes the properties
    //Takes an err and an array of properties to delete
    deleteProps: function(err, props){
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
    },

    //Fetches all properties from the database using p_id
    //qdata is an empty array
    fetchProps: function(err, callback){
      //Example Connection
      console.log("level 1");
      db.getConnection(function(err, connection) {
        if (err) {throw err;}
        console.log("level 2");
        // Use the connection
        var sql = "SELECT * FROM frd.users where p_id = ?";
        console.log(`This is This: ${self}`)
        var inserts = [self.p_id];                                //Problem: need to find way to get self into this callback method
        sql = mysql.format(sql, inserts);
        console.log(sql);
        console.log("level 3");

        connection.query(sql, function(err, rows) {
          if (err) {throw err;}
          console.log("level 4");
          // And done with the connection.
          //Set Rows Here
          callback(rows);
          connection.release();
          console.log("level 5");

          // Don't use the connection here, it has been returned to the pool.
        });
        console.log("level 6");
      });
      //If something bad happens add a string to err
      //Example: err = "update could not finish"
    }

  };
};

module.exports = user_model;
