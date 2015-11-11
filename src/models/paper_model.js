var mysql = require('mysql');
var db = require('../database/db_pool');
var uuid = require('node-uuid');

var Paper = function(){

	//No need for Getters and Setters

    // If an id is given, find it in the database, use those attributes
    if (attrs.p_id !== undefined){
      this.data = {
        paper_id : attrs.p_id,
        paper_title: "",
        paper_abstract: "",
        paper_citation: ""
      };
      console.log(`Retrieving data...`);
      //fetch
    }else{
      this.data = {
        paper_id: uuid.v1(),
        paper_title: "",
        paper_abstract: "",
        paper_citation : ""
      };

      for(var property in this.data ){
        //console.log(attrs[property]);
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
        var sql = "SELECT * FROM frd.papers where paper_id = ?";
        var inserts = [self.p_id];                       
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
        var sql = "SELECT * FROM frd.papers where paper_id = ?";
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
            var sql = "SELECT ??,??,??,?? FROM frd.papers where p_id = ?";
            var inserts = ['paper_id','title','abstract','citation', self.data.p_id];
            sql = mysql.format(sql, inserts);

            connection.query(sql, function(err, rows) {
              try{
                if (err) {throw err;}
                if (rows[0] == undefined) {throw new Error('No row data');}
                // And done with the connection.
                //Set Rows Here
                for (prop in rows[0]){
                  //console.log(`prop ${prop} = ${rows[0][prop]}`);
                  self.data[prop] = rows[0][prop];
                }

                //self.data = rows;
                callback(); // All values have been set
                connection.release();
              }catch (err){
                //Create new object attib if no data is found
                self.data = {
                  paper_id: uuid.v1(),
                  paper_title: "",
                  paper_abstract: "",
                  paper_citation: ""
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

	/*                    *\
	**  Setter Functions  **
	\*                    */

	this.setPaperId = function ( id_number ){
		this.data['paper_id'] = id_number;
	},

	this.setPaperTitle =function ( title ){
		this.data['paper_title'] = title;
	},

	this.setPaperAbstract = function ( abstract ){
		this.data['paper_abstract'] = abstract;
	},

	this.setPaperCitation = function ( citation ){
		this.data['paper_citation'] = id_number;
	}

};

/*
**Returns an actual new instance of a paper
**/
module.exports = paper_model;


