var mysql = require('mysql');
var config = require('../../config');
var user_model = require('../models/user_model');
var db = require('../database/db_pool');

function Paper(){
  //Determines whether a user exists,
  this.exist = function(obj, callback){
    db.getConnection(function(err, connection) {
      try{
        if (err) {throw err;}
        // Use the connection
        if (obj.username !== undefined){
          var sql = `SELECT ??,??,??,?? FROM ${config.db.database}.papers where papers_id = ?`;
          var inserts = ['papers_id','title','abstract','citation', obj.papers_id];
          sql = mysql.format(sql, inserts);
        }else{
          throw new Error('No id paper provided');
        }

        connection.query(sql, function(err, rows) {
          try{
            if (err) {throw err;}
            var paper = rows[0];
            if (paper == undefined) {throw new Error('No row data');}
            //var new_user = new user_model({user});
            //self.data = rows;
            callback('', paper); // All values have been set
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
  },

  //Gets all keywords for a given paper based on paper id
  //This includes searchable keywords, and paper keywords
  this.getKeywords = function(obj, callback){

  }
}

module.exports = new Paper();
