var model = require('./model');
var db = require('db_pool');

function user_model(id){
  return {
    //No need for Getters and Setters
    p_id: id;
    f_name: "";
    l_name: "";
    pass = "";
    email = "";

    //Updates the properties
    //Takes an err and an array of properties to update
    //We never need to create a property because default values are used
    //For the properties not initially set
    updateProps: function(err, props){
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

    //Gets the properties
    //Takes an err and an array of properties to delete
    getProps: function(err, props){
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

  };
};


module.exports = user_model;
