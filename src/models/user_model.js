var mysql = require('mysql');
var db = require('../database/db_pool');
var uuid = require('node-uuid');

// Takes in an object of attribute default values, this can be empty
function user_model(attrs){
    //No need for Getters and Setters

    // If an id is given, find it in the database, use those attributes
    if (attrs.p_id !== undefined){
      this.data = {
        p_id : attrs.p_id,
        f_name: "",
        l_name: "",
        pass : "",
        email : ""
      };
      console.log(`fetching`);
      //fetch
    }else{
      this.data = {
        p_id: uuid.v1(),
        f_name: "",
        l_name: "",
        pass : "",
        email : ""
      };

      for(var property in this.data ){
        console.log(attrs[property]);
  			if(attrs[property] !== undefined){
  				this.data[property] = attrs[property];
  			}
  		}
    }


    //Updates the properties in the database
    //Takes an err and an array of properties to update
    //We never need to create a property because default values are used
    //For the properties not initially set
    this.updateProps = function(err, callback){
      //Example Connection
      var self = this;
      db.getConnection(function(err, connection) {
        if (err) {throw err;}
        // Use the connection
        var sql = "SELECT * FROM frd.users where p_id = ?";
        var inserts = [self.p_id];                             //Problem: need to find way to get self into this callback method
        sql = mysql.format(sql, inserts);

        connection.query(sql, function(err, rows) {
          if (err) {throw err;}
          // And done with the connection.
          //Set Rows Here
          callback(rows);
          self.data = rows;
          connection.release();
          // Don't use the connection here, it has been returned to the pool.
        });
      });
      //If something bad happens add a string to err
      //Example: err = "update could not finish"
      return;
    };

    //Deletes the properties
    //Takes an err and an array of properties to delete
    this.deleteProps = function(err, callback){
      //Example Connection
      var self = this;
      db.getConnection(function(err, connection) {
        if (err) {throw err;}
        // Use the connection
        var sql = "SELECT * FROM frd.users where p_id = ?";
        var inserts = [self.p_id];                             //Problem: need to find way to get self into this callback method
        sql = mysql.format(sql, inserts);

        connection.query(sql, function(err, rows) {
          if (err) {throw err;}
          // And done with the connection.
          //Set Rows Here
          callback(rows);
          self.data = rows;
          connection.release();
          // Don't use the connection here, it has been returned to the pool.
        });
      });
      //If something bad happens add a string to err
      //Example: err = "update could not finish"
      return;
    };

    //Fetches all properties from the database using p_id
    //qdata is an empty array
    this.fetchProps = function(err, callback){
      //Example Connection

        var self = this;
        db.getConnection(function(err, connection) {
          try{
            if (err) {throw err;}
            // Use the connection
            var sql = "SELECT ??,??,??,?? FROM frd.users where p_id = ?";
            var inserts = ['f_name','l_name','pass','email', self.data.p_id];
            sql = mysql.format(sql, inserts);


            connection.query(sql, function(err, rows) {
              try{
                if (err) {throw err;}
                if (rows[0] == undefined) {throw new Error('No row data');}
                // And done with the connection.
                //Set Rows Here
                for (prop in rows[0]){
                  console.log(`prop ${prop} = ${rows[0][prop]}`);
                  self.data[prop] = rows[0][prop];
                }

                //self.data = rows;
                callback(); // All values have been set
                connection.release();
              }catch (err){
                //Create new object attib if no data is found
                self.data = {
                  p_id: uuid.v1(),
                  f_name: "",
                  l_name: "",
                  pass : "",
                  email : ""
                };
              }
            });

          }catch(err){
            console.log(`${err}`);
          }
            // Don't use the connection here, it has been returned to the pool.
        });
      //If something bad happens add a string to err
      //Example: err = "update could not finish"
      return;
    };
};

module.exports = user_model;
